import React, { useState } from "react";
import SimpleEChart from "./SimpleEChart";

function Calculator() {
    const [cal, setCal] = useState({
        wealthCrores: 50000000,
        currentAge: 25,
        targetAge: 75,
        inflationRate: 5,
        returnRate: 12.5,
        currentSavings: 500000
    });
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
        const yearsToTarget = cal.targetAge - cal.currentAge;
        if (yearsToTarget <= 0) {
            alert('Target age must be greater than current age.');
            return;
        }
        setTarget(yearsToTarget);

        let infla = 1 + (cal.inflationRate / 100);
        const FV = cal.wealthCrores * Math.pow(infla, yearsToTarget);
        setResult(FV.toFixed());

        const annualReturnRate = cal.returnRate / 100;
        const futureSavings = cal.currentSavings * Math.pow(1 + annualReturnRate, yearsToTarget);
        setSavingResult(futureSavings);

        const afterSavingWealth = FV - futureSavings;
        setAfterSavingWealth(afterSavingWealth.toFixed());

        const totalMonths = yearsToTarget * 12;
        const monthlyRate = (cal.returnRate / 12) / 100;
        const SIPAmount = ((FV - futureSavings) * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        setSip(SIPAmount.toFixed());

        const totalSip = SIPAmount * totalMonths;
        setTotalSip(totalSip.toFixed());

        const growthAmount = (FV - futureSavings) - totalSip;
        setGrowthAmount(growthAmount.toFixed());
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-IN').format(num);
    };

    const sampleData = [
        { value: result ? parseFloat(result) : 0, name: 'Targeted Wealth Amount (Inflation adjusted)' },
        { value: savingResult ? parseFloat(savingResult.toFixed()) : 0, name: 'Growth of Savings Amount' },
        { value: afterSavingWealth ? parseFloat(afterSavingWealth) : 0, name: 'Final Targeted Amount (Minus Savings)' },
        { value: sip ? parseFloat(sip) : 0, name: 'Monthly SIP Investment Required' },
        { value: totalSip ? parseFloat(totalSip) : 0, name: 'Total Amount Invested Through SIP' },
        { value: growthAmount ? parseFloat(growthAmount) : 0, name: 'Total Growth Amount' },
    ];

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
                        <SimpleEChart name="Investment Growth" data={sampleData} />
                        {result !== null && (
                            <div className="result mt-5">
                                <h6>* Your targeted Wealth Amount (Inflation adjusted) :- <b><i className="fa fa-rupee"></i>{formatNumber(result)}</b></h6><br/>
                                <h6>* Growth of your Savings Amount ({cal.returnRate}% per annum) :- <b><i className="fa fa-rupee"></i>{formatNumber(savingResult.toFixed())}</b></h6><br/>
                                <h6>* Final Targeted Amount ( Minus growth of your savings amount) :- <b><i className="fa fa-rupee"></i>{formatNumber(afterSavingWealth)}</b></h6><br/> 
                                <h6>* Number of years you need to save :- <b>{target} Years</b></h6><br/>
                                <h6>* Monthly SIP investment required (to become Crorepati) :-<b><i className="fa fa-rupee"></i>{formatNumber(sip)}</b></h6><br/> 
                                <h6>* Total Amount Invested through SIP in {target} years :- <b><i className="fa fa-rupee"></i>{formatNumber(totalSip)}</b></h6><br/> 
                                <h6>* Total Growth Amount :- <b><i className="fa fa-rupee"></i>{formatNumber(growthAmount)}</b></h6><br/> 
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Calculator;