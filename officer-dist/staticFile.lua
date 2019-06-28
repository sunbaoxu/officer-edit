-- ngx.say("hello world lua11");
-- 引用http相关操作
local zhttp = require("resty.http")

-- 封装http请求
function http_post_client(url, body, timeout)
    local httpc = zhttp.new()

    timeout = timeout or 30000
    httpc:set_timeout(timeout)

    local res, err_ = httpc:request_uri(url, {
        method = "POST",
        body = body,
        headers = {
            ["Content-Type"] = "application/x-www-form-urlencoded",
        }
    })
   if not res then
        return nil, err_
   else
      if res.status == 200 then
                return res.body, err_
           else
                return nil, err_
           end
    end
end

-- 获取客户端ip
local headers=ngx.req.get_headers()
local ip=headers["X-REAL-IP"] or headers["X_FORWARDED_FOR"] or ngx.var.remote_addr or "0.0.0.0"
-- ngx.say(ip);

-- 获取参数
local args = nil
local request_method = ngx.var.request_method
-- ngx.say(request_method);


-- 获取参数的值
if "GET" == request_method then
    args = ngx.req.get_uri_args()
elseif "POST" == request_method then
    ngx.req.read_body()
    args = ngx.req.get_post_args()
end

local token = ""
local type = ""
local typeCode = ""
local fileCode = ""
local loadType = ""

for key, val in pairs(args) do  
    if key == "token" then  
        token = val;
    elseif key == "type" then  
        type = val;
    elseif key == "typeCode" then  
        typeCode = val;
    elseif key == "fileCode" then  
        fileCode = val;
    elseif key == "loadType" then  
        loadType = val;
    else  
        -- ngx.say(key, ": ", val)  
    end  
end  

-- ngx.say("图片地址为: ", imgUrl)  

local cjson = require("cjson");


local res1 = http_post_client("http://10.81.237.8:8201/obtainFileController/getFilePatch?token="..token.."&ip="..ip.."&type="..type.."&typeCode="..typeCode.."&fileCode="..fileCode,"",30000);

local obj = cjson.decode(res1)


if obj.retuCode == 1 then
    return ngx.exec(obj.filePatch.."&loadType="..loadType);
else
    -- ngx.exit(ngx.HTTP_FORBIDDEN);
    return ngx.redirect("/staticFile/public/html/error.html?errorCode="..obj.retuCode);
    -- sngx.say("执行过程中发生错误，错误代码｛",obj.retuCode,"｝");
end