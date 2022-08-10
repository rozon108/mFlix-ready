const tabIcon = document.querySelectorAll('.tab-item');
const tabContent = document.querySelectorAll('.tab-content-item');

function selectItem(e){
    console.log(this.id)
    //remove active / bottom border and add to clicked icon
    removeBorder();
    this.classList.add('tab-active')
    // hide the content and display respective content
    hideContent();
    const activeTabContent = document.querySelector(`#${this.id}-content`);
    activeTabContent.classList.add('active');

}
function removeBorder(){
    tabIcon.forEach(x => {
        x.classList.remove('tab-active');
    })
}
function hideContent(){
    tabContent.forEach(x=>{
        x.classList.remove('active');
    })
}


//Adding event Listner
//This waits and listen for click event when clicked it runs 'selectItem'
tabIcon.forEach(x=>x.addEventListener('click', selectItem))




