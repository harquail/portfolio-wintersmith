mogrify -verbose -format "medium.jpg" -quality 100 -resize 720x1300\> contents/portfolio/*/*.png contents/portfolio/*/*.tif ; rm -rf harquail.com && wintersmith build && ship harquail.com -to s3