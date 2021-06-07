let request=require('request');
let cheerio=require('cheerio');

const $url='http://apis.data.go.kr/B551182/dgamtCrtrInfoService/getDgamtList';
const $KEY='PVjhFQcS7gjRC63V3UTd7zablrruk0E1mUmcIcAjsxHFdBmi6k8j51pBGU9i8XA0XKscp3KwwbpTeA2IwRj%2FeQ%3D%3D'; 
const $numOfRows=10;
const $pageNo=1;
const $mdsCd='G03900131';

const $api_url=$url+'?ServiceKey='+$KEY+'&numOfRows='+$numOfRows+'&pageNo='+$pageNo+'&mdsCd='+$mdsCd;

// console.log($api_url);


request($api_url,function(err,res,body){
    $=cheerio.load(body);

    $('item').each(function(idx){
        let no1=$(this).find('injcPthNm').text();
        let no2=$(this).find('itmNm').text();
        let no3=$(this).find('mnfEntpNm').text();
        console.log(`투여경로명: ${no1}, 품목명: ${no2}, 제조업체명: ${no3}`);
    });
});


