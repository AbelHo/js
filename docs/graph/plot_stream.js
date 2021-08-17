if (window.location.hash){
  hashparams = new URLSearchParams(window.location.hash.slice(1))
  hash_dict = Object.fromEntries(hashparams.entries());

  url = hash_dict["url"]
  xname = hash_dict["xname"]
  yname = hash_dict["yname"]
}


function getRandomData() {
      return Math.random();
  }  

async function getDataURL(url){
  let rq = await fetch(url);
  let data = await rq.json();
  return data
}

async function filterData(data, xname, yname){
  return [data[xname],data[yname]]
}

async function getData(url,xname,yname){
  console.log(xname)
  // url=''
  // xname = 'datetime'
  // yname = 'yaw'
  d = await filterData(await getDataURL(url),xname,yname)
  return d
}

async function extend(){
  // setInterval(function(){
    [x,y] = await getData(url,xname,yname)
    Plotly.extendTraces('chart',{ x:[[x]], y:[[y]]}, [0]);
    // cnt++;
    // maxCnt=500
    // if(cnt > maxCnt) {
    //     Plotly.relayout('chart',{
    //         xaxis: {
    //             range: [cnt-maxCnt,cnt]
    //         }
    //     });
    // }
  // },500);
}

async function extend_x_index(){
  // setInterval(function(){
    [x,y] = await getData(url,xname,yname)
    Plotly.extendTraces('chart',{ y:[[y]]}, [0]);
    cnt++;
    maxCnt=50
    if(cnt > maxCnt) {
        Plotly.relayout('chart',{
            xaxis: {
                range: [cnt-maxCnt,cnt]
            }
        });
    }
  // },500);
}


async function init(){
  [x,y] = await getData(url,xname,yname)

  Plotly.plot('chart',[{
      x: [x,x],
      y: [y],
      type:'line'
  }]);
  cnt = 0;

  return setInterval(extend,1000)
  // setInterval(function(){
  //   [x,y] = await getData()
  //   Plotly.extendTraces('chart',{ x: x, y:[[y]]}, [0]);
  //   cnt++;
  //   if(cnt > 500) {
  //       Plotly.relayout('chart',{
  //           xaxis: {
  //               range: [cnt-500,cnt]
  //           }
  //       });
  //   }
  // },500);

}

async function init2(){
  [x,y] = await getData()

  Plotly.plot('chart',[{
      y: [y],
      type:'line'
  }]);
  cnt = 0;

  return setInterval(extend_x_index,500)
}


var timer_plot = init()

