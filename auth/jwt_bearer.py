from datetime import datetime
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from auth.jwt_handler import decodeJWT

class jwtBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(jwtBearer, self).__init__(auto_error=auto_error)
        
    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(jwtBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid or Expired Token")
            if not self.verify_token_exp(credentials.credentials):
                raise HTTPException(status_code=403, detail="Token expired")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid or Expired Token")

    def verify_token_exp(self, token: str):
        try:
            payload: dict = decodeJWT(token)
            exp: float = payload.get("exp")
            if datetime.utcnow().timestamp() > exp:
                return True
            return False
        except Exception as e:
            print(f"Error verifying token: {e}")
            return False