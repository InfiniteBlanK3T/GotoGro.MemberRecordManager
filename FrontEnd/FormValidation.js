
export class FormValidation 
{
	constructor(aRegEx) 
    {
		this.regEx = aRegEx;
	}

	//setters

	setInput(aInput) 
    {
		this.input = aInput;
	}

	setRegEx(aRegEx) 
    {
		this.regEx = aRegEx;
	}

	//getters

	getInput() 
    {
		return this.input;
	}
	getRegEx() 
    {
		return this.regEx;
	}

    isInputValid() 
    {
        if (this.input == "") 
        {
            return false;
        } 
        else if (!this.input.match(this.regEx)) 
        {
            return false;
        } 
        else 
        {
            return true;
        }
    }
}