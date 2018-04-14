import AV from './leancloud'

export default function(user){
    var {id,attributes:{username}} = user || AV.User.current() || {attributes:{}}
    return {id,username}   //等价于 return {id:id,username:username}  ES6新语法
}