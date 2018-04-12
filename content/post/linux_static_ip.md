+++
categories = ["y"]
date = "2018-04-12T14:33:09+08:00"
description = "Linux 配置静态 IP 地址 和 静态路由"
tags = ["go"]
title = "Linux 配置静态 IP"

+++

1. Edit /etc/network/interfaces, enter:

```
$ sudo vi /etc/network/interfaces
```

The syntax is as follows:

```
route add -net $NET netmask $MASK gw $GATEWAY
route add -net 192.168.1.0 netmask 255.255.255.0 gw 192.168.1.254
```

You need to add above syntax to post-up command as follows:

```
post-up command
post-up route add -net 192.168.1.0 netmask 255.255.255.0 gw 192.168.1.254
```


Configure static ip address

```
# 自动启动设备
auto eth0 
# 允许热插拔
allow-hotplug eth0
# 配置 接口 静态网络地址 (static|dhcp)
iface eth0 inet static
# 静态地址/子网掩码
        address 10.70.201.5/24
# 配置默认网关 (只能配置一个网关)        
        #gateway 205.153.203.97
# 配置路由
        #post-up route add -net 10.70.201.0 netmask 255.255.255.0 gw 10.70.201.6        
```

2. Example

```
#--------------------------------------------#
# Setup the loopback network interface (lo0) #
#--------------------------------------------#
auto lo
iface lo inet loopback
 
#--------------------------------------------#
# Setup eth0 - connected to private LAN/VLAN #
#--------------------------------------------# 
auto eth0
allow-hotplug eth0
iface eth0 inet static
        address 10.70.201.5
        netmask 255.255.255.192
        ### Ubuntu Linux add persistent route command ###
        post-up route add -net 10.0.0.0 netmask 255.0.0.0 gw 10.70.201.6
 
#----------------------------------------#
# Setup eth1 - connected to the Internet #
#----------------------------------------#
auto eth1
allow-hotplug eth1
iface eth1 inet static
        address 205.153.203.98
        netmask 255.255.255.248
        ### Ubuntu Linux - This is your default gateway ###
        gateway 205.153.203.97
```

3. Save and close the file. You need to restart the networking as follows:

```
sudo service networking restart
```
