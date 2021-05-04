import React from 'react';
import { Form } from 'react-bootstrap';


class Prediction extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            symbol: ''
        }
    }


    onInputChange = (event) => {
        this.setState({
            symbol: event.target.value
        });
        // console.log(event.target.value);
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        var result = document.getElementById("mySelect").value;
        var image = document.getElementById("imageid");
        var source = "";
        let sourceMap = new Map()
        sourceMap.set('AAPL', "https://lh3.googleusercontent.com/n_ChBU115p7PlduENeK1wRWT3N9LuG9z4ynGlMCJaOuoawHiGlIssHYG2JybtPzQW43ym_gAxOhokEFK8oO2htoEWyY7SDurUDLUZIDvHYlF93ui2z569LSYVOkdE-YQ3FHiIQ2DrOAjPAJF70-5CS1O7EyGfSKg4AtWEd9u3iAocAkFeniH5bA7WBbwLErsWpOt3XkHWpoO0gPJ2kgNXX8Vp-hoDO5kW3eEb44_8JekWkxkDSoJ8V0cQA9mF2VJ0c4agJbab40guaglRJPucs5ZMB0srsGMZZWpPbNE3Ws9js1pXkDXSxOJXStJgvLD5G1X1g4K_WhM5vPkOTHuXfadouuimmOeH8LReWKQ3LR3WP-bSRHDoAKfRt_ICM7dojGBFRSpbmQ92SZqQj_Xa6IXcS8OfRMGd41rqFFWAkiBTUmcfwNqgSMeGAeSQskCU9rkSe8R-_q2Sd3NErN7dzE0TyKVxNCETciHG-fOUGiI0_JeDsBh94HsatvDJyrDcxH87Ei3aYYyMZLzqKCHrw5gXtURLd1mxQCfa4YxmRiwrir8KVwoGu7pNylIcoiOrup4SWBpt0wxZ3wdt9Op5r6czNe9OOivK0Fl3iSVDFZi_5-f1HZ1NRKhx6ute-LjVz8g8eHWbTWtdrAhPFlhaAcOY293RR4DpuONXXuZa_ODcaI_rTNdDxZFO1-ryCuGrEmE2Aa7d5jgJEG__THo38o=w362-h185-no?authuser=0")
        sourceMap.set('AMG', "https://lh3.googleusercontent.com/1t8uyEqtltxAQ_4a1vatRju33y4vI27-4RgBC7sRKSnqb6VQJSp2lPtlP45oL7YfuKhS6ZAEhXOV8g-IxjV11CKfwNHVbUJNW4nOvv8GFGdMcv7b4n_1oG3yAJss6uHbxazvay8SOxMqNuFSqsPWhy-3ov2w4mems5B-w_FHcxOIkS8rdDcMwJgqxFXn-UBzUkau5Kmm5xb_MR7OKD_hhXtzkZxqtZuXibGH2UUfnEu7kd5FsUnd59TiDlAa0p0SaPbhLgnfGOFRYGHYLstQtufQ9m35fyIVpRAcEH9qmRMKLl35FEjh1zB5aJXgps2Q4Sf_WfCGj5SCgZpKNR7SsqvIMbAz9ZUgnLpKz1XyODzcqWK8BpLp3h4xptxDB_pbvF3sDoXZVEiTPCnc7KSOvolyV-izVnZ9GZojuxYHmN1Ct1iJpaP23fgKkWY9CFsu7_pWFyG5nKXOyM-8E35IMaxULK1CI4QLQiarOeBNSv54PGTOkxKSrNnER98WtnwbgIMu8NwFDHCve4SqQ2RF3FotncpA0e2R-BjLZQJW3fye45fizCbRkqpq-Yq8KiYX2dXyCBoeC0k9ZrXDCEDel46RkfaHk4Bqwi_VP-Dt0DbKoTw0e7NN4q3A63nlHl14XM9uWHQ6EqPVL51EitIzT1KU4Hi-DdJQWkq8vB6wAjWHoY14NsSJTSYTBpTsp3DYLzIvrnamNMz1XyzgHdY8BwQ=w362-h185-no?authuser=0")
        sourceMap.set('AXP', "https://lh3.googleusercontent.com/MQ1UKHWR9K6neQL_kxcJ5WS2vAKbmR-jVRlBXfsQM1yGRJKeLNIMOuwQ68nrASNnWBTrhnj0DnPVJW8JluWKuWTjQf7FNJT0iHWd_kawNq73i-OJosrk1bJdMmS24gqOqVPQzlYY3YyC08YXIPsdRRHGPSU-_TZivW8Br2xVSgloYTJFnYzsUdn3PLinePprbqWqlNHINFlhCJMjZP4PUgQV-eQqvfCzdY8n61SHWHwPqlvonZ05h1Ko4mIwj0puokUaeEddvJ6uruzVJBA5v4K5iqoPP-DufoAG6sKQVG91z5JSiX6ea234IbMPPB9vvcN-d6aA_pa06Fneji3yr5GZ1lXTqHPyrDQcXuNjzUogeK9cp6lhzWX7W5KylWJRGutHl-w644rmPwxs_pLS_p8TkqG8uOt4noF-KoFafMRNO4R_qIyrgaWVaWkFCpcshBg6pBPMMYo1SdcpcIa3zTl0Lof8jkTCwt0TMNV1vQITvqgVZEtTLEv1i2np3UzPlKvYakJbbkOzKkqtSYAByMtpFz29rK9zCY-D9NQsxkvYNES1CilNKlBRo6bQ0nPwGwHO3_3WPo7OjWuhsDaP2wJ7FgWkDys2iIdPMoPzsQpnENc6NkM5WRmzudyKa5dBY-HnMNrVysePnqJZyiCAwpEYbOB34bg-5EudKHs62lyLEC6-_jxK_cLc4grpo2B8ZyFUgZa6luKFYRG-3u13MDc=w362-h185-no?authuser=0")
        sourceMap.set('BA', "https://lh3.googleusercontent.com/4LyJRTEeKppTzcYfXSXsMYF5lO0J3IpAAlkDhSrbKBN3T-JfaesADw3m-rzT1kmDX1jFZCeMNz2NraHvJyspz-KL8santK2eTPdKrly0qRLsg5aZh17okkZLssfCgfOxwwjLHlNtqw55HZ2SUqPzG494_QwA6gN7TugdTtgC3z3RIqA9lT8_-ShyeHqBhtKRFaOzf8m42PQnJfex-N4wGIP2FKncNqNcva_TvISXEbHqrkR153VS8BzfUROd-vezseQ-ydBC934ngMSBZ09IWLTLlxS9oZcvaW_oTlXwcjQevtSQaAF7lHM9YqJF5KQntiokUXM80Go2l7SYkZdsVH9uyZsk4Cxm5W7rtnYdtpUeadewPXcxqkLuDNyAQTo5UG6KmZZlMbm_7mHvqIlycyOO4kaRPZI2-CBy9GoXekBmM8kHe3aySMPFFLL9RagsU1UBF1_RIiYm2MgX-u0s1b_gXKwnYshrIb9GKOAwBIn-nkJyN-zEqtegZ-ussIO8lqwdv-UwuoLeP48M2fDjIWBqbUU2wqIYI55li0GXHLcLNSLRfczoxvPLcGCJWNPkOaTtf1G3mBtwRujSkDK1Mf21v_8eHp5IL6GgMZMjgCU4GTG-w351POi4HbwoBl8PLc1zRrHNYhHHptqtGVzwQh489_lLey-X8Ys8u2NBKFkEvVRkBFy7EQRmuX-PCtldznQZeMM2HLqNH6c48RBSZEM=w362-h185-no?authuser=0")
        sourceMap.set('CAT', "https://lh3.googleusercontent.com/XaqLiRRNIy2HMiZl1AcaZEjDcscZHlsqG1ul7IFFo01lS1KtIMX8At8p17NCQCq0Nj7kHBbsocDJjK4bo3tBe93VSRi44PAfai_7nqw1x8RZEnIUPsHBK6_FulzhQuhVPmGka8QR9O_Wf6AeXzR0DfjHooD-RYO_cvjCKP5vWrXEPAKYUekvX7p7tRMjgZBaKUdKIisf0-c8FfUME04k7QM9LXSbUym3MM6XG6RNXmXS5ciVk4jtcTcCdVGpChZu-ad_bTVR57WDr3EBnScPAA0ZkA4V4xS3A0Fv8zNV8NJnRUHImsNPYXe_ICQGCHOhzjhaPDMTTp6pIoPTO-W-eiF2Ke4pkzVTfEeF3j2pt9B4tod33-CNfsVWlbhhKRefXakwkD_hFMse3xsnrtWtFM3pcecztdgO0BKykpm5wMbx8cjsaiqh61O0mZTr6Or1UCh7siqq5OJ-xJ_hrEsNnflVUGAV-APEH6F4YF9D4ftxEhpcnXeDIhV6PKVhhjDVgvqwv3Cn0aLwTy4hQzG-0-7UZCU73P67JUXousg6cUrVxrAv6xMr4Hi1MSMo6LeZmKQaUQ8ZUHJJYqvigvvMJM0JrGWvO2Vg8Sv6KiEvNQOT8u5j4C2XvZIaJ7-tFZ1GPkZngflAW7LM8hcp8Ipz4Iv2Yj-ACpZF2QhGLQbdcW_MRkONYgd08eiDZ3Nn07aRw0Wjdrb4a4_Jk60bIUyHFes=w362-h185-no?authuser=0")
        sourceMap.set('CRM', "https://lh3.googleusercontent.com/X61CxZmT-GTUBpdtDF5RdXYa8ONmi6kt5J5z98VHs74TP9WxlVfQTY7H-QCrjU2FSHGQEeKfVUXsphhClhEYvsbkSrD2BT2FzuLgYnck9IaMHuNimj4ZN1f6kTaHqPFdLjxGYph8XvU-AfmMKuNqBHg0piPAXjluNZdYmrU_f7qoxEhmUtxkUnwfdthIGUpVY76mAxFeoanm02tQtAybGusvtkCLTfoXrNBiQ8L1Nwm-pmmYIHGEUGJv4kAvt90renewqhn9oTusNIMkO5uru7-U3Gf_iXXE0qsrzSZRySKeJT-sgPivJy053nD7uZNEBvS05APhjQw249lFjPWI4E47OQSeLk0EHCOdAExkCzzku_i5EqoUhTLb4UvkekeBU2ndLrZlpH3sJIfaYvQ9UjtI2iwVrazyF_I2Q8XA9QBYdqEyGwJVrE8Pqp3eCZcqcHG8JpLxSM-GH3PnNp6xwOhzHotowaBozxcgIxiXz6fEjabKd7SsNqu4YTkaQ9bYZe1ComF-VLMfavr4q2rMYPDSraTFs9nZTJI9BBgd58JIxvHanWMp5s0QnRa-Y8znI0I8WjgwscoIyMQ0LuHPzPLl55VzSrrY7IAj98FdjhrVXvuM7LFUcclxo6mCpin9Ya951kwT-onnZonJ13830gGd5dO7S9R7UQp2I31Xhq2UL5jWWjlN4YeOs3q0GiECYIp9AZ3iC08hyCP8RdQkHAs=w362-h185-no?authuser=0")
        sourceMap.set('CSCO', "https://lh3.googleusercontent.com/fL7d8sacilI4Qj8rVYdO9YormeY8c6Z9qFKuf6Vp3sli7hdAIrtVcfKFpnBBzEWqTRyirYQ_JRcXQ9w2xt72ykIVxXSK75mDzRSO8v2MO2j17H57W_-rX7u_PT6MSdxTh4TXZJDDTdbJtiMDMkU3mjwwA9qEq0SzBx_rNgaT_Z_uPyvg47rjN5ooNuGB6tLTAfVZlPPCp9PrRolV5rjYq5FBil1b_3rV2qp7Uj6C3OobSMxbEAlV4-KNxwY7YRPRrOOUh0Nk41z23D6ZdC6eCyEy2GGcEOeatauJK6hULVLDRnCL4EKUMBqCNqcaNk4tBTf0Ji0r8Tp_K8lTmJ4TvsYWkED21_YjrsM-zxCKgDye1zzm9eb5HfsJie_9UQO5ufgMkuzjCK3dupr_RAh48Y_b-xswqNNhyILU0ghpOzieohCSVSIr-II1mm7scioKFnDIoQ96ry8C7OIIGi2mpFqg0Yw9V-RHKCkm1rwaoyEqJwxclgEGvosmub_mg5-o-PU8XEjJpMXGgz-_mFFkvf4aZAw5Gr8SEObC6xvjKIOveIaUWAx2K3I6KbNaO8rNeV30suKXWTBz7P7KzxQ8TfbNw2ORgy__1WYLuncwppuLvnIBJZG0UG0jq_VbuCF8-LNSUS0B_6fYjUnnTorp3z4_fxXRaJHUu2LGMCNYPGqr9bA2M_EKnwieXr_sKu_QtKohFzEgZUHbTiMyStTjHGU=w362-h185-no?authuser=0")
        sourceMap.set('CVX', "https://lh3.googleusercontent.com/Z52ilWp9BQPffc4Xho94YhloP9aUe_OL4LhVjImRZ_M8t9t8g_Z8C5Wj5M4ZYG3lIwkErU1iW3VsE-0DhKERtkzfcKogtqc29VSv-fbOgx3TrahNKtoqGaafOj2ULFcqzW4TMwNkcZEmwpwVazJZiK5p_OTmn_7NuMxMgFYtkl_AOHJWDLgTFVXuEb3RRUHn3MZouHxo4QnBeKCoSQs6_tE3_Hl14uLG3VW2BoS9Vxh-39EmCrOocfPOhcmGByQksq2DD4pCsZio5ilD8lpUM9OfbSpQJHj-U10KLX_leCLB2SeLNq9X2_sdvzwcPgotcL-l4Wr22PvNI3XoSfQdQ9GM8zwlV6ivCZacOSgJZ9ud1JOmjbq-iEubgjMh9tJk0LwjWr_mut5vlT-RHY3DLNWPbl8GZwMwYhsWqm20nF7LpFEzJ_wfMk0RWlq6PQIOT-ClWJRvjcJhyy26i619VwaEnscEflosMFVVKiGlbv7ehwyxSaRFatIL7MBHTSwCGpf_KFKM_KglcyVfwGNnUI4JIXpc--qR1e7uzSEIA9QJ4djuX5mVpGknOMOmiA5IhA3TB3porVoUjIKx7QKHJpZKVxR0RMyJXZWPfXXPcwbhQebhaALEvv7S1f0OzXTN6DQjoGAeUZua-rhMWmf60iq4KPRDGj0ykm1JRUFTiGb5FDi8n4yd3UPVQpG-rz3Rn2QII7RiwryRQB68L0K6nR0=w362-h185-no?authuser=0")
        sourceMap.set('DIS', "https://lh3.googleusercontent.com/0Z85AXyZ6m6kN4HdXQsX0Sfuo_a4B40sR37T3-XZs2bo9_GXlbsf2xOwbEzZyPQch9X_1wEUHtsMNry8cVZeb_swu9QHZbAuMQ_I7DoX7zpGOXqWEJ_bqTOPtz-j7pFwnmUjcxe0OAd7O6wAVmfnwFXWNQUGVvRHCz8_ibKkjh0gWj51WIu5KNbQr75SmYiD1kJ4xnFAoWjQgBvYYUV1LagrA-LKSDvuofCrrx_v7fWxdVW_wFeuVIQ-HZOrBqklRr59Ge7GpqH7sLwzwr0EasKEYro-PNjlVgasbOAUvBAZGLP52k4hXcK7kCYyrczZWbPZtUVOWRviGxkhGWPGxisBJyjWeXK20GBb7L2wNJK4apdce3ai3irCDnBN2yr0zWsx4gKfzLBRMyjT_pfPYzz2Qbe7pir-uPzuQVkIWrD38uysFo5Vkapg_aNox2lgMeoupEsGh8cxrFLEQ0cDYeGUJe8c-_JxYYqSMGFxoOGHRVudpJVrN9kFN6PFF1_3gCfYrSzDUvKuwgeP-4bBGYFz71fJitCd4HuVwZbP_oxU2YiiDa1-2eqpArOJIBxUoIICHBlwdoMTQbRhzLL6dJE28Qumsze3VK7ntc_Bpl9oz0agr0CgcD6q2KltfYneppHXG7cZiwuBXMn6t0LFYvg6mrI-FitKzFPDr_0q02gjQ1A_NbLrP0kjx-Iml0B1oQ9p-GfCN0ZkwC9CA3afyvQ=w362-h185-no?authuser=0")


        source = sourceMap.get(result);
        if (source == null) {
            source = "https://miro.medium.com/max/6400/1*uxPIG28daFbS47aZ4YOV0A.jpeg"
        }

        image.src = source;
        var text = "The prediction of ";
        text += result + ": "
        var textBox = document.getElementById("resultText");
        textBox.innerHTML = text;
        textBox.style.visibility = "visible";
        // this.props.onFormSubmit(this.state);
    }

    render() {
        function test() {
            console.log("hello world")
        }

        test();

        return (
            <form onSubmit={this.onFormSubmit}>
                <p>Please Enter the Stock that you would like to predict</p>
                <div>
                    <select
                        style={{ margin: "10px" }} id="mySelect" >
                        <option value="AAPL"> AAPL </option>
                        <option value="AMG"> AMG </option>
                        <option value="AXP"> AXP </option>
                        <option value="BA"> BA </option>
                        <option value="CAT"> CAT </option>
                        <option value="CRM"> CRM </option>
                        <option value="CSCO"> CSCO </option>
                        <option value="CVX"> CVX </option>
                        {/* <option value="DIS"> DIS </option>
                        <option value="DOW"> GS </option>
                        <option value="GS"> GS </option>
                        <option value="HON"> HON </option>
                        <option value="IBM"> IBM </option>
                        <option value="INTC"> INTC </option>
                        <option value="JNJ"> JNJ </option>
                        <option value="KO"> KO </option>
                        <option value="JPM"> JPM </option>
                        <option value="MCD"> MCD </option>
                        <option value="MMM"> MMM </option> */}
                        {/* <option value="MSFT"> MSFT </option>
                        <option value="NKE"> NKE </option>
                        <option value="PG"> PG </option>
                        <option value="TRV"> TRV </option>
                        <option value="UNH"> UNH </option>
                        <option value="CRM"> CRM </option>
                        <option value="VZ"> VZ </option>
                        <option value="V"> V </option>
                        <option value="WBA"> WBA </option>
                        <option value="WMT"> WMT </option>
                        <option value="DIS"> DIS </option>
                        <option value="DOW"> DOW </option> */}

                    </select>
                </div>
                <input type="submit" value="Submit" style={{ margin: "10px" }} onClick={this.clickSubmit}></input>
                <div>
                    <label type="text" value="text" id="resultText" style={{ margin: "10px" }}></label>
                </div>
                <div>
                    <img
                        src="https://miro.medium.com/max/6400/1*uxPIG28daFbS47aZ4YOV0A.jpeg"
                        alt="new" width="700px"
                        height="400px"
                        id="imageid"
                    />
                </div>

            </form>

        );
    }
}
export default Prediction;