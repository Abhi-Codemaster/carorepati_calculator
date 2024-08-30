import React, { useState } from "react";

function Calculator() {
    const [cal,setCal] = useState({wealthCrores:50000000,currentAge:25,targetAge:75,inflationRate:5,returnRate:12.5,currentSavings:500000})
    const [result, setResult] = useState(null);
    const [savingResult, setSavingResult] = useState(null);
    const [target, setTarget] = useState(null);
    const [afterSavingWealth, setAfterSavingWealth] = useState(null);
    const [sip, setSip] = useState(null);
    const [totalSip, setTotalSip] = useState(null);
    const [growthAmount, setGrowthAmount] = useState(null);

    const handleChange = (e) => {
        setCal({ ...cal, [e.target.name]: Number(e.target.value) }); // Convert values to numbers
    };

    
    const handleCalculate = () => {
        const yearsToTarget = cal.targetAge-cal.currentAge;
        if (yearsToTarget <= 0) {
            alert('Target age must be greater than current age.');
            return;
        }
        setTarget(yearsToTarget);

        let infla = 1+(cal.inflationRate/100);
        const FV = cal.wealthCrores*Math.pow(infla,yearsToTarget);
        setResult(FV.toFixed());
        
        const annualReturnRate = cal.returnRate / 100;
        const futureSavings = cal.currentSavings * Math.pow(1 + annualReturnRate, yearsToTarget);
        setSavingResult(futureSavings);

        setAfterSavingWealth(FV.toFixed()-futureSavings.toFixed());

        const totalMonths = yearsToTarget*12;
        const monthlyRate = (cal.returnRate/12)/100;
        
        const SIPAmount = ((FV-futureSavings) * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        setSip(SIPAmount);

        setTotalSip(SIPAmount.toFixed()*totalMonths.toFixed());

        setGrowthAmount((FV.toFixed()-futureSavings.toFixed())-(SIPAmount.toFixed()*totalMonths.toFixed()));
    };
    // (FV)=P×(1+r)^t
    // FV (inflation-adjusted)=PV×(1+i)^n
    // A = P * (1+r/100)^n

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-IN').format(num);
        
    };
    

    return (
        <>
            <div className="form-group">
                <h1 className="text-center m-4">Carorepati Calculator</h1><hr/>
                <div className="row">
                <div className="col-md-5 ms-3">
                <h3 className="text-center my-3">Select Range</h3>

                <div className="row">
                    <div className="col-md-12">
                        <label>How many Crores (at current value) you would need to consider yourself wealthy:</label>
                        <input type="range" className="form-control-range" name="wealthCrores" id="rangeSlider" min="10000000" max="1000000000" value={cal.wealthCrores} onChange={handleChange} />
                        <div className="col-md-3 float-end">
                        <input type="text" className="form-control" name="wealthCrores" id="rangeSlider" value={cal.wealthCrores} onChange={handleChange} />
                        </div>
                    </div>
                </div><br/>
                <div className="row">
                    <div className="col-md-12">
                        <label>Your Current Age:</label>
                        <input type="range" className="form-control-range" name="currentAge" id="rangeSlider" min="10" max="100" value={cal.currentAge} onChange={handleChange}  />
                        <div className="col-md-3 float-end">
                        <input type="text" className="form-control" name="currentAge" id="rangeSlider" value={cal.currentAge} onChange={handleChange}  />
                        </div>
                    </div>
                </div><br/>
                <div className="row">
                    <div className="col-md-12">
                        <label>The age when you want to become a Crorepati:</label>
                        <input type="range" className="form-control-range" name="targetAge" id="rangeSlider" min="10" max="100" value={cal.targetAge} onChange={handleChange} />
                        <div className="col-md-3 float-end">
                        <input type="text" className="form-control" name="targetAge" id="rangeSlider" value={cal.targetAge} onChange={handleChange} />
                        </div>
                    </div>
                </div><br/>
                <div className="row">
                    <div className="col-md-12">
                        <label>The expected rate of inflation over the years (% per annum):</label>
                        <input type="range" className="form-control-range" name="inflationRate" id="rangeSlider" min="0" max="10" value={cal.inflationRate} onChange={handleChange} />
                        <div className="col-md-3 float-end">
                        <input type="text" className="form-control" name="inflationRate" id="rangeSlider" value={cal.inflationRate} onChange={handleChange} />
                        </div>
                    </div>
                </div><br/>
                <div className="row">
                    <div className="col-md-12">
                        <label> What rate of return would you expect your SIP investment to generate (% per annum):</label>
                        <input type="range" className="form-control-range" name="returnRate" id="rangeSlider" min="5" max="20" value={cal.returnRate} onChange={handleChange} />
                        <div className="col-md-3 float-end">
                        <input type="text" className="form-control" name="returnRate" id="rangeSlider" value={cal.returnRate} onChange={handleChange} />
                        </div>
                    </div>
                </div><br/>
                <div className="row">
                    <div className="col-md-12">
                        <label>How much savings you have now (Rs):</label>
                        <input type="range" className="form-control-range" name="currentSavings" id="rangeSlider" min="0" max="10000000" value={cal.currentSavings} onChange={handleChange} />
                        <div className="col-md-3 float-end">
                        <input type="text" className="form-control" name="currentSavings" id="rangeSlider" value={cal.currentSavings} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                    <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
                </div>
                <div className="col-md-6 ms-5">
                <h3 className="text-center my-3">Result</h3>
                {result !== null && (
                        <div className="result">
                            <h6>* Your targeted Wealth Amount (Inflation adjusted) :- <b><i class="fa fa-rupee"></i>{formatNumber(result)}</b></h6><br/>

                            <h6>* Growth of your Savings Amount ({cal.returnRate}% per annum) :- <b><i class="fa fa-rupee"></i>{formatNumber(savingResult.toFixed())}</b></h6><br/>

                            <h6>* Final Targeted Amount ( Minus growth of your savings amount) :- <b><i class="fa fa-rupee"></i>{formatNumber(afterSavingWealth)}</b></h6><br/> 

                            <h6>* Number of years you need to save :- <b>{target} Years</b></h6><br/>

                            <h6>* Monthly SIP investment required (to become Crorepati) :-<b><i class="fa fa-rupee"></i>{formatNumber(sip.toFixed())}</b></h6><br/> 

                            <h6>* Total Amount Invested through SIP in {target} years :- <b><i class="fa fa-rupee"></i>{formatNumber(totalSip)}</b></h6><br/> 
                            
                            <h6>* Total Growth Amount :- <b><i class="fa fa-rupee"></i>{formatNumber(growthAmount)}</b></h6><br/> 
                        </div>
                    )}
                </div>
                </div>
                

            </div>
                
        </>
    );
}
export default Calculator;