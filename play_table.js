
 var _checkbox = Array.from(document.querySelectorAll('input[type="checkbox"][name="_playcheck"]'))

 var _checkAll = document.querySelector('._checkAll');

 var _activeTabList = [];

 var _tabactive = [];

 var _playTabevent = document.querySelector('.playtab-container');

 _checkAll.addEventListener('click',(element)=>{
    if(element.target.checked){
       _checkbox.map((item)=>{
            let _itemIndex = _activeTabList.find((e)=> e == item.value);
            if(!_itemIndex){
                item.checked = true;
                _activeTabList.push(item.value);
            }
       })
    }else{
        _checkbox.map((e)=>{
            e.checked = false;
            _activeTabList = [];
        })
    }
})

_checkbox.forEach(e => {
    e.addEventListener('click',(element)=>{
        if(!element.target.checked){
            _checkAll.checked = false;
            let _newList = _activeTabList.filter((e)=> e != element.target.value);
            _activeTabList = [..._newList];
        }else{
            let _itemIndex = _activeTabList.find((e)=> e==element.target.value);
            if(!_itemIndex) _activeTabList.push(element.target.value);
            if(_checkbox.length == _activeTabList.length)  _checkAll.checked = true;
        }
    })
});


document.querySelector('#openTab').addEventListener('click',()=>{
    let _tabItems  = _activeTabList.map((e)=>{
       return  generateMultipleTab(_playTabevent,e,_activeTabList[0])
    }).join('');
    _playTabevent.innerHTML = _tabItems;
    (_playTabevent.dataset.generator)?eval(_playTabevent.dataset.generator+`('${_activeTabList[0]}')`) : ''
})

document.querySelector('.playtab-container').addEventListener('click',(e)=>{
    let _checkItem = _tabactive.find((data)=> data == e.target.dataset.item );
    if(!_checkItem){
        _tabactive.push(e.target.dataset.item) 
    }
    let _tabItems  = _activeTabList.map((dataElement)=>{
        return  generateMultipleTab(_playTabevent,dataElement,e.target.dataset.item)
     }).join('');
     _playTabevent.innerHTML = _tabItems;
   (e.target.dataset.function)? eval(e.target.dataset.function+`('${e.target.dataset.item}')`) : ''
})

function generateMultipleTab(tabEvent,val,acvtTabindex){
    return `<div class='${tabEvent.dataset.class} ${(val == acvtTabindex )?'active' : ''}' data-item='${val}'
    data-function='${tabEvent.dataset.generator}' >${val}</div>`
}
