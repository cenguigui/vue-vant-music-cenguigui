// 由于接口不一样所以就不用前嘴统一了
import service from '..';

// 获取首页轮播图
export function getBanner(){
    return service({
        method: 'GET',
        url: 'banner/',
    })
}


// 获取首页推荐歌单
export function getMusicList(){
    return service({
        method: 'GET',
        url: '?type=new&page=1&limit=99',
    })
}



// 获取搜索
export function getSearchMusic(search){
    return service({
        method: 'GET',
        url: `?name=${search}&page=1&limit=10`,
    })
}