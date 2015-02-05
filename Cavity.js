var fs = require('fs');

var vNXVal = 10;

fs.readFile('Input.txt', function (err, InputBuffer) {

  if (err) throw err;
  
  var text = InputBuffer.toString();
  var lines = text.split('\n');
  var iNumOfCOl = parseInt(lines[0]);
  var vInput = [];
  var vIntermediateOutput = [];
  var vSortedInput = [];
  
  var iMatrixSize = lines.length - 1;
  if (iNumOfCOl !== iMatrixSize)
  {
      console.log("Invalid Matrix" + iNumOfCOl);
      return;
  }
  
  for (var i = 1; i < lines.length; i++)
  { 
     var line = lines[i];
	 if (line.length !== iNumOfCOl)
     {
        console.log("Invalid Matrix");
        return;   
     }
     
     for (var j = 0; j < line.length; j++)
     {
        var vItem = parseInt(line[j]);
        vInput.push(vItem);
        vIntermediateOutput.push(vItem);
        if (vSortedInput.indexOf(vItem) === -1)
			vSortedInput.push(vItem);
     }
  }
  
  vSortedInput.sort();
  
  for (var k = 0; k < vSortedInput.length; k++)
  {
      var vToCheck = vSortedInput[k];
      SetXValue(vToCheck, vInput, vIntermediateOutput, iMatrixSize);
  }
  
  var vOutput = '';
  for (var p = 0; p < vInput.length; p++)
  {
      if (vInput[p] === vNXVal)
        vOutput += 'X';
      else
        vOutput += vInput[p]; 
        
      if ((p + 1) % iMatrixSize === 0)
        vOutput += '\n';
  }
  
  fs.writeFile("Result.txt", vOutput, function(err)
  {
      
  });
  
});

function SetXValue(vItem, vInputs, vProcessed, offset)
{
    for (var i = 0; i < vInputs.length; i++)
    {
        if (vProcessed[i] !== vNXVal && vItem === vInputs[i])
        {
            var iTop = i - offset;
            if (iTop >= 0)
            {
                if (vProcessed[iTop] !== vNXVal)
                    vProcessed[i] = vNXVal;
                       
            }
            
            var iBottom = i + offset;
            if (iBottom < vProcessed.length)
            {
				if (vProcessed[iBottom] !== vNXVal)
                    vProcessed[i] = vNXVal;    
            }
            
            var iLeft = i - 1;
			if (iLeft >= 0)
            {
                if (vProcessed[iLeft] !== vNXVal)
                    vProcessed[i] = vNXVal;    
            }
 
			if (i % offset !== 0)
            {
				var iRight = i + offset;
                if (iRight < vProcessed.length)
                {
                    if (vProcessed[iRight] !== vNXVal)
                        vProcessed[i] = vNXVal;    
				}
            }
            
            if (vProcessed[i] !== vNXVal)
                vInputs[i] = vNXVal;
        }
        
    }
}


