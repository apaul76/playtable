
 var _checkbox = Array.from(document.querySelectorAll('input[type="checkbox"][name="_playcheck"]'))

 var _checkAll = document.querySelector('#_checkAll');

 var _activeTabList = [];

 var _tabactive = [];

 var _playTabevent = document.querySelector('.playtab-container');

 var _callback = {funct : null}

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
    _tabactive.push(_activeTabList[0]);
    (_playTabevent.dataset.generator)?eval(_playTabevent.dataset.generator+`('${_activeTabList[0]}')`) : null;
})

document.querySelector('.playtab-container').addEventListener('click',(e)=>{
    let _checkItem = _tabactive.find((data)=> data == e.target.dataset.item );
    let _removeItem = e.target.dataset.closetab;
    if(!_checkItem && !_removeItem){
        _tabactive = [];
      (e.target.dataset.item)? _tabactive.push(e.target.dataset.item):null;
    }
    if(_removeItem){
        let itemIndex = _activeTabList.indexOf(_removeItem);
        let nextItem = ((itemIndex+1) != _activeTabList.length )?_activeTabList[itemIndex+1] : _activeTabList[itemIndex-1];
        if(_removeItem == _tabactive[0]){
            _tabactive=[];
            _tabactive.push(nextItem);
        }
        _activeTabList.splice(itemIndex,1);
      }
    let _tabItems  = _activeTabList.map((dataElement)=>{
        return  generateMultipleTab(_playTabevent,dataElement,_tabactive[0])
     }).join('');
     _playTabevent.innerHTML = _tabItems;
     (_callback.funct)? eval(_callback.funct+`('${_tabactive[0]}')`) : null;
})

function generateMultipleTab(tabEvent,val,acvtTabindex){
    _callback.funct = tabEvent.dataset.generator;
    return `<div class='${tabEvent.dataset.class} ${(val == acvtTabindex )?'active' : ''}' data-item='${val}'
    data-function='${tabEvent.dataset.generator}' >${val} 
    <i class="${tabEvent.dataset.crossicon}"  data-closetab='${val}' aria-hidden="true" style='float:right'></i>
    </div>`
}





