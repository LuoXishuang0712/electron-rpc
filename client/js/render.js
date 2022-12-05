var thrift = require("thrift");
var login_service = require("./thrift_gen/LoginService")
var ttypes = require("./thrift_gen/test_types")

var $ = require("jquery")

var thrift_connection = thrift.createConnection('127.0.0.1', 8000, {
    transport: thrift.TBufferedTransport(),
    protocol: thrift.TBinaryProtocol()
})

var thrift_client = thrift.createClient(login_service, thrift_connection);

thrift_connection.on("error", function(e){
    console.log(e);
})

var button = $("#request")
var user_name = $("#user-name")
var password = $("#password")
var output = $("#output")

button.on("click", function() {
    if(user_name.val() == "" || password.val() == ""){
        alert("请输入内容！")
        return;
    }
    var req_obj = new ttypes.Request({  // new实例化一个function对象
        username: user_name.val(),
        password: password.val()
    });
    console.log(req_obj)
    thrift_client.doAction(
        req_obj,
        function(error, res) {
            if(error){
                console.log(error)
            } else {
                output.text(res)
            }
        }
    )
})
