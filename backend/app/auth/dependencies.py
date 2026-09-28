import jwt
from fastapi import Header, HTTPException, status
from app.core.config import settings

# Cached JWKS client — fetches and caches Supabase's public signing keys,
# refreshed automatically by PyJWKClient when a new key id (kid) is seen.
_jwks_client = jwt.PyJWKClient(
    f"{settings.supabase_url}/auth/v1/.well-known/jwks.json"
)


def get_current_user(authorization: str = Header(...)) -> dict:
    """
    Verifies the Supabase-issued JWT sent as:
    Authorization: Bearer <token>
    Returns the decoded token payload (contains sub=user_id, email, etc.)
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or malformed Authorization header",
        )

    token = authorization.removeprefix("Bearer ").strip()

    try:
        header = jwt.get_unverified_header(token)
        alg = header.get("alg")

        if alg == "HS256":
            # Legacy Supabase projects sign with the shared JWT secret
            payload = jwt.decode(
                token,
                settings.supabase_jwt_secret,
                algorithms=["HS256"],
                audience="authenticated",
            )
        else:
            # Newer Supabase projects sign with ES256/RS256 — verify via JWKS
            signing_key = _jwks_client.get_signing_key_from_jwt(token)
            payload = jwt.decode(
                token,
                signing_key.key,
                algorithms=["ES256", "RS256"],
                audience="authenticated",
            )
    except jwt.PyJWKClientError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not fetch signing key: {e}",
        )
    except jwt.PyJWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {e}",
        )

    return payload  # payload["sub"] is the Supabase user_id