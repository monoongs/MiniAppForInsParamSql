var tempArr = []

console.log(sqlFormatter.format("SELECT * FROM table1"));

function step1() {

  if(!document.getElementById('query').value){
    alert('Not Allow Null')
  }

  let query = document.getElementById('query').value
  console.log(query)
  let numOfVar = countVar(query)

  if(numOfVar) {
    document.getElementById('step2').innerHTML = ""
    createInput(numOfVar)

    if(document.getElementById('btn-format')){
      document.getElementById('btn-format').remove()
    }  
  } else {
    alert('No variable in query')
  }

}




function step2(lastNum) {
  let arrVar = createArray(lastNum)

  tempArr = arrVar

  let resultQuery = replaceVar(arrVar, lastNum)
  
  step3(resultQuery)

}

function step3(resultQuery) {
  document.getElementById('step3').innerHTML = ""
  // coptyToClipboard(resultQuery)
  // resultQuery += '<br/> <br/> <a href="https://sqlformat.org/" target="_blank">Beautify code online.</a>'

  console.log(typeof(resultQuery))
  console.log(typeof(sqlFormatter.format(resultQuery)))

  resultQuery = sqlFormatter.format(resultQuery)

  console.log(resultQuery)
  
  // let child = document.createElement('div')
  // child.innerHTML = resultQuery
  // document.getElementById('step3').appendChild(child);

  //
  let output = document.getElementById('output');

  output.value = resultQuery

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  //
  console.log(tempArr)
}

function countVar(query) {
  try {
    let number = query.match(/:/g).length
    return number
  } catch (error) {
    return null
  }
  
}

function createInput(numOfVar) {
  console.log(numOfVar)
  var str = "";
  var space = '&nbsp;&nbsp;'
  for(let i = 1; i <= numOfVar; i+=1) {
    if(i>=10) {
      space = ''
    }
    str += '<div style="display: flex; margin-bottom: 10px;">'+i+'.'+space+'&nbsp; <input style="width:100%" class="" type="text" name="v'+i+'" /></div>'
   
    if(i == numOfVar) {
      str += '<br><button class="btn btn-danger btn-block" onclick="step2('+i+')">Make Result Or Format Only</button>'
    }
  }
  
console.log(str)
var child = document.createElement('div');
child.innerHTML = str;

document.getElementById('step2').appendChild(child);

}

function createArray(round) {
  let arr = []

  console.log(document.getElementsByName('v1')[0].value)

  for(let x = 1; x <= round; x+=1) {
    if(document.getElementsByName('v'+x+'')[0].value == '') {
      arr.push('null')
    } else {
      arr.push(document.getElementsByName('v'+x+'')[0].value)
    }
  }

  arr.unshift('Empty')

  console.log(arr)

  return arr

}

function replaceVar(arrVar, lastNum) {
  console.log('ReaplaceVar Running')
  let query = document.getElementById('query').value
  let newQuery = query
  // let lsQuery = ''
  // console.log(newQuery)
  console.log(arrVar)

  // ONE ROUND
  // newQuery.replace(':1','TEST')
  // newQuery += newQuery.replace(":1", arrVar[1]);
  // newQuery += newQuery



  for(y = 1; y <= lastNum ; y+=1) {
    // console.log('--')

    query = query.replace(':'+y+'', arrVar[y])
    newQuery = query

    // console.log(newQuery)
    // console.log('End Round '+y+'')
  }

  console.log(newQuery)

  return newQuery

}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// function coptyToClipboard(resultQuery) {
//   // resultQuery.select()
//   // return document.execCommand("copy")
// }

function formatOnly() {
  let query = document.getElementById('query').value
  resultQuery = sqlFormatter.format(query)

  console.log(resultQuery)

  let output = document.getElementById('output');

  output.value = resultQuery
}
