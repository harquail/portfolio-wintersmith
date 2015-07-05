
# Blog
A custom wintersmith template & site for www.harquail.com.

/sh/wship.sh runs git push, generates thumbnails, and uploads the site to s3

Templates for pages are written in jade, and can be found in /templates/

Markdown files for portfolio pages are in contents/portfolio

##Building
npm install wintersmith -g
npm install wintersmith-autoprefixer-sass -g 
npm install ship -g
npm install -g pdftohtmljs
brew install pdf2htmlEX
gem install sass

add /contents/wship.conf and /contents/cloudflare-auth.conf
The format for these files is: 
#ship.conf
s3:
    access_key:
    secret_key:
    ignore:["**/DS_Store"]

#cloudflare-auth.conf
defaults:
    token:
    email:
    domain:
