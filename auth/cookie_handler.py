import requests
from .jwt_handler import decodeJWT

class BearerAuth(requests.auth.AuthBase):
    def __init__(self, auto_Error: bool = True):
        super(BearerAuth, self).__init__(auto_error=auto_Error)
        print(requests)