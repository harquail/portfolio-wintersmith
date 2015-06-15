RED=$(printf "\e[31m")
RESET=$(printf "\e[m")
#get commit message
read -e -p "Enter a commit message: " COMMIT
git add "contents/"
#commit
git commit -am $COMMIT
#push
git push && find . -type f -name '*~' -delete -print && echo "${RED}removed tilde files\n${RESET}"

# resume regeneration
if [ ! -f contents/resume/resume.pdf.html ]; then
    pdftohtmljs contents/resume/resume.pdf contents/resume/resume.pdf.html ipad
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
mogrify -verbose -format "medium.jpg" -quality 100 -resize 720x800\> contents/portfolio/*/*.png contents/portfolio/*/*.tif ; echo "${RED}generated thumbnails\n${RESET}"
rm -rf harquail.com && echo "${RED}cleaned\n${RESET}"
wintersmith build && echo "${RED}built\n${RESET}"
ship harquail.com -to s3 && echo "${RED}shipped.\n${RESET}"