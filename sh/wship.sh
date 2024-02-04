RED=$(printf "\e[31m")
RESET=$(printf "\e[m")
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
            pdftohtmljs $i $i.html ipad
            echo "${RED}generated html for $i \n${RESET}"
        fi
    done

#should double size here
mogrify -verbose -format "medium.jpg" -quality 100 -resize 720x800\> contents/portfolio/*/*.png ; echo "${RED}generated thumbnails\n${RESET}"
rm -rf harquail.com && echo "${RED}cleaned\n${RESET}"
wintersmith build && echo "${RED}built\n${RESET}"
cd harquail.com && s3-upload && echo "${RED}uploaded.\n${RESET}"
# cd .. && cfcli -c contents/cloudflare-auth.conf purgecache 
echo "${RED}shipped.\n${RESET}"
