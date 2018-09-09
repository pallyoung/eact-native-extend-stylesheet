import {StyleSheet as SH} from 'react-native';

let  StyleSheet = Object.create(SH);
let _currentTheme = {};

let _updater ;
function addTheme(theme){
    _currentTheme = Object.assign(_currentTheme,theme);
    return createStyleSheet();
}

const STYLE_CREATOR_LIST = [];

function createStyleSheet(){
    if(_updater){
        return _updater;
    }
    _updater = new Promise((res)=>{
        setTimeout(()=>{
            STYLE_CREATOR_LIST.forEach(f=>{
                f();
            });
            _updater = undefined;
            res();
        },0)
    });
    return _updater;
    
   
}
StyleSheet.create = function(func){
    let id = STYLE_CREATOR_LIST.length;
    let _sh = {};
    let creator = function(){
        _sh = SH.create(func(_currentTheme));
    }
    STYLE_CREATOR_LIST.push(creator);
    creator();
    let sh = {};
    for(let o in _sh){
        Object.defineProperty(sh,o,{get:()=>_sh[o]});
    }
    return sh;
}

StyleSheet.addTheme = addTheme;
export default StyleSheet;