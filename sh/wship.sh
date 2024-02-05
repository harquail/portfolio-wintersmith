RED=$(printf "\e[31m")
RESET=$(printf "\e[m")
CLOUDFLARE_KEY=$(awk '{print $1}' ./cloudflare-api-credentials.txt) 
echo "run with nvm use 6"
#get commit message
read -e -p "Enter a commit message: " COMMIT
git add "contents/"
#commit
git commit -am "$COMMIT"
#push
git push && find . -type f -name '*~' -delete -print && echo "${RED}removed tilde files\n${RESET}"

# resume regeneration
if [ ! -f contents/resume/harquail_resume.pdf.html ]; then
    pdftohtmljs contents/resume/harquail_resume.pdf contents/resume/harquail_resume.pdf.html ipad
    echo "${RED}generated html for resume \n${RESET}"
fi

# for all pdfs in portfolio
for i in contents/portfolio/*/*.pdf;
    do
# if the file doesn't exist
        if [ ! -f $i.html ]; then
            echo "${RED}generating html for $i \n${RESET}"
            pdftohtmljs $i $i.html ipad
            echo "${RED}generated html for $i \n${RESET}"
        fi
    done

#should double size here
mogrify -verbose -format jpg -quality 100 -resize 720x800\> contents/portfolio/*/*.png; echo "${RED}generated thumbnails\n${RESET}"
rm -rf harquail.com && echo "${RED}cleaned\n${RESET}"
wintersmith build && echo "${RED}built\n${RESET}"
cd harquail.com && s3-upload && echo "${RED}uploaded.\n${RESET}" &&
curl -X POST "https://api.cloudflare.com/client/v4/zones/3a71dfadfdc0354a1615dc2e0e084285/purge_cache" -H "Authorization: Bearer $CLOUDFLARE_KEY" --data '{"purge_everything":true}'
echo "${RED}shipped.\n${RESET}"
