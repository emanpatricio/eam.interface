
some problem in linux is watching the file:


Problem: 
Error: watch ENOSPC

Resolution:
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

----

