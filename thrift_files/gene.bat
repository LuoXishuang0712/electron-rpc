REM thrift -out 存储路径 --gen 接口语言 thrift接口文件名

mkdir js
mkdir py

thrift -out js --gen js:node test.thrift 
thrift -out py --gen py test.thrift 

mkdir ../server/thrift_gen
mkdir ../client/js/thrift_gen

cp -r ./py/* ../server/thrift_gen/
cp -r ./js/* ../client/js/thrift_gen/