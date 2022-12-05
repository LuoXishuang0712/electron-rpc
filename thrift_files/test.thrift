struct Request {
 1: string username;
 2: string password;
}

exception RequestException {
 1: required i32 code;
 2: optional string reason;
}

service LoginService {
 string doAction(1: Request request) throws (1:RequestException qe); 
} 