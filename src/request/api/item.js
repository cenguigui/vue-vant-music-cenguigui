// 由于接口不一样所以就不用前嘴统一了
import service from '..';

// 获取歌单详情页数据
export function getMusicItemList(id){
    return service({
        method: 'GET',
        url: `?id=${id}&limit=30&type=list`,
    })
}

//获取歌词接口
export function getMusicLyric(id){
    return service({
        method: 'GET',
        url: `?id=${id}&type=lyr&format=lineLyric`,
    })
}