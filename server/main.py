from thrift_gen.test import *

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer

class Server:
    def doAction(self, request: ttypes.Request):
        print(request)
        return """\
            Hello Electron!\r\n
            There is Python\r\n
            This is your user name: %s\r\n
            And your password: %s\r\n
            END.\r\n
            """ % (request.username, request.password)

if __name__ == "__main__":
    port = 8000
    ip = "127.0.0.1"
    
    handler = Server()
    processor = LoginService.Processor(handler)

    transport = TSocket.TServerSocket(ip, port)

    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()
    server = TServer.TThreadedServer(processor, transport, tfactory, pfactory)
    
    print("server started")

    server.serve()

    print("server ended")