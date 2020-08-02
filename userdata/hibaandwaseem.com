--- 
customlog: 
  - 
    format: combined
    target: /usr/local/apache/domlogs/hibaandwaseem.com
  - 
    format: "\"%{%s}t %I .\\n%{%s}t %O .\""
    target: /usr/local/apache/domlogs/hibaandwaseem.com-bytes_log
documentroot: /home4/hibawaseem/public_html
group: hibawaseem
hascgi: 1
homedir: /home4/hibawaseem
ip: 108.167.181.242
owner: root
phpopenbasedirprotect: 1
port: 80
scriptalias: 
  - 
    path: /home4/hibawaseem/public_html/cgi-bin
    url: /cgi-bin/
  - 
    path: /home4/hibawaseem/public_html/cgi-bin/
    url: /cgi-bin/
serveradmin: webmaster@hibaandwaseem.com
serveralias: www.hibaandwaseem.com mail.hibaandwaseem.com
servername: hibaandwaseem.com
ssl: 1
usecanonicalname: 'Off'
user: hibawaseem
userdirprotect: ''
