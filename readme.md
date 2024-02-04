
# Blog
A custom wintersmith template & site for www.harquail.com.

/sh/wship.sh runs git push, generates thumbnails, and uploads the site to s3

Templates for pages are written in jade, and can be found in /templates/

Markdown files for portfolio pages are in contents/portfolio

## Building
nvm use 8
npm install wintersmith -g
npm install wintersmith-autoprefixer-sass -g 
npm install ship -g
npm install -g pdftohtmljs
brew install pdf2htmlEX
gem install sass

add /contents/wship.conf and /contents/cloudflare-auth.conf
The format for these files is: 
### aws-credentials.json
<pre>
{ 
    "accessKeyId": "PUBLIC_KEY", 
    "secretAccessKey": "SECRET_KEY", 
    "region": "us-west-2" 
}
</pre>
### cloudflare-auth.conf
<pre>
defaults:
    token:
    email:
    domain:
</pre>
