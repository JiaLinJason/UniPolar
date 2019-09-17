#1、js代码规范
（1）方法名：小驼峰；  
（2）属性名：'小驼峰' 或 '_'+'小驼峰';  
（3）每句js代码后必须跟分号;  
（4）返回组件的结构体
```
(
    <Label>
        <Tag></Tag>
        <Tag></Tag>
        ...
    </Label>
)
```
（5）组件属性、方法
```
<Label  props={} props2={} ...
        onClick={this.handleClick}  //方法每行只能写一个，必须换行
        onPress={this.handlePress}
>
</Label>
```
（6）类名：大驼峰