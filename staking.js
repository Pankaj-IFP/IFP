import React from 'react'
import { FormGroup, Label, Input, Button, Modal, ModalBody } from 'reactstrap';
import { AiOutlineWarning, AiFillCloseCircle } from "react-icons/ai";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { BsCheckCircle } from "react-icons/bs";
import { ImInfo } from "react-icons/im";
import { IoIosInformationCircle } from "react-icons/io";
import Axios from 'axios';
import ReactPaginate from "react-paginate";
import Header from '../../common-components/header/header';
import Footer from '../../common-components/footer/footer';
import AccountNav from '../user-dashboard/account-nav/account-nav';
import '../staking/staking.scss'
import { NavLink } from 'react-router-dom';
import { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import stakingImg from '../../../assets/images/stake-img.png'
import LogoIcon from '../../../assets/images/logo-icon.png';
import StakingTable from '../user-dashboard/wallet/wallet-tab/staking-table/staking-table';
import AddStaking from '../user-dashboard/wallet/Staking/staking'
import moment from 'moment';
import Claim from '../user-dashboard/wallet/wallet-tab/staking-table/stakingbutton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillExclamationCircleFill } from "react-icons/bs";

export default class EarnCandy extends Component {

    constructor(props) {
        super(props)
        this.state = {
            headers: { headers: { authorization: localStorage.getItem('token') } },
            page: 1,
            pageSize: 10,
            stakingData: [],
            dataPerPage: "",
            totalDocuments: "",
            daysFilter: "",
            reward_balance: "",
            modal: false,
            amount: "",
            period1: "30",
            totalBalance: "",
            successMsg: "",
            errorMsg: "",
            isVerfied: false,
            calculateBalance: "",
            indexModal: "",
            selectedcardindex: '',
            openModal: false,
            data: "",
            staking: [

                {
                    id: 1,
                    images: <img src={LogoIcon} alt='' />,
                    apyPerentage: "8%",
                    apyName: "APY",
                    depositeName: "Deposit",
                    deposite: "CANDY",
                    earnName: "Earn",
                    earn: "CANDY",
                    daysName: "Days",
                    days: "30D",
                    selectedPeriod: 0,
                    period: [{

                        "p": "30  Days (APY 8%)",

                    },
                    {
                        "p": "90  Days (APY 10 %)",

                    },
                    {
                        "p": "180  Days (APY 12 %)",

                    },
                    {
                        "p": "365  Days (APY 14 %)",

                    },
                    ]

                },
                {
                    id: 2,
                    images: <img src={LogoIcon} alt='' />,
                    apyPerentage: "10%",
                    apyName: "APY",
                    depositeName: "Deposit",
                    deposite: "CANDY",
                    earnName: "Earn",
                    earn: "CANDY",
                    daysName: "Days",
                    days: "90D",
                    period: [{
                        "p": "30  Days (APY 8%)",

                    },
                    {
                        "p": "90  Days (APY 12 %)",

                    },
                    {
                        "p": "180  Days (APY 10 %)",

                    },
                    {
                        "p": "365  Days (APY 10 %)",

                    },
                    ]
                },
                {



                    id: 3,
                    images: <img src={LogoIcon} alt='' />,
                    apyPerentage: "12%",
                    apyName: "APY",
                    depositeName: "Deposit",
                    deposite: "CANDY",
                    earnName: "Earn",
                    earn: "CANDY",
                    daysName: "Days",
                    days: "180D",
                    period: [{
                        " p": "30  Days (APY 8%)",

                    },
                    {
                        "p": "90  Days (APY 12 %)",

                    },
                    {
                        "p": "180  Days (APY 10 %)",

                    },
                    {
                        "p": "365  Days (APY 10 %)",

                    },
                    ]
                },
                {



                    id: 4,
                    images: <img src={LogoIcon} alt='' />,
                    apyPerentage: "14%",
                    apyName: "APY",
                    depositeName: "Deposit",
                    deposite: "CANDY",
                    earnName: "Earn",
                    earn: "CANDY",
                    daysName: "Days",
                    days: "365D",
                    period: [{
                        "p": "30  Days (APY 8%)",

                    },
                    {
                        "p": "90  Days (APY 12 %)",

                    },
                    {
                        "p": "180  Days (APY 10 %)",

                    },
                    {
                        "p": "365  Days (APY 10 %)",

                    },
                    ]

                },


            ]



        }

        this.toggle = this.toggle.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.toggle1 = this.toggle1.bind(this);

    }

    toggle(data, index) {
        console.log("data", data)
        var modal = !this.state.modal
        if (data) {
            modal = modal
        }
        this.setState({
            modal: modal,
            selectedcardindex: index
        });


    }
    // indexNumber(index) {
    //  this.indexNumber(index) 
    //     console.log("indexNumber", index)
    //     this.setState({
    //         indexModal :index
    //     },()=>{
    //         // console.log
    //     })

    // }


    componentDidMount() {
        this.getStakingHistory();
        this.getReward();

    }

    getStakingHistory() {
        Axios.get(`/getStakingHistory?page=${this.state.page}&pageSize=${this.state.pageSize}&daysFilter=${this.state.daysFilter}`, this.state.headers)
            .then((response) => {
                console.log("getStakingHistory", response)
                let dataPerPage = Math.ceil(response.data.data.totalDocuments / this.state.pageSize)
                if (response.data.code == 200) {
                    this.setState({
                        stakingData: response.data.data.list,
                        dataPerPage: dataPerPage,
                        totalDocuments: response.data.data.totalDocuments
                    })
                }
            }, () => {
                // console.log("stttttttttttt",this.state.stakingData)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    handlePageClick = (event) => {
        this.setState(
            {
                page: event.selected + 1,
            }, () => {
                this.getStakingHistory();
            });
    };
    handleChangeSearch(event) {
        var name = event.currentTarget.name;
        this.setState({ [name]: (event.currentTarget.value) }, () => {
            this.getStakingHistory();
        })

    }
    handleChangeClaim(e) {
        var name = e.currentTarget.name;
        this.setState({ [name]: e.currentTarget.value, isVerified: true })

    }
    calculatePer(Data) {

        let totalBalance = this.state.totalBalance
        let twentyFivePer = ((totalBalance) * (Data) / 100)
        this.setState({ calculateBalance: twentyFivePer })
    }
    calculate(Data) {
        let totalBalance = this.state.totalBalance
        let fiftyPer = ((totalBalance) * (Data) / 100)
        this.setState({ calculateBalance: fiftyPer })
    }
    calculate(Data) {
        let totalBalance = this.state.totalBalance
        let seventyFivePer = ((totalBalance) * (Data) / 100)
        this.setState({ calculateBalance: seventyFivePer })
    }
    calculate(Data) {
        let totalBalance = this.state.totalBalance
        let hundardPer = ((totalBalance) * (Data) / 100)
        this.setState({ calculateBalance: hundardPer })
    }
    getReward() {
        Axios.get("/getWallet", this.state.headers)
            .then((response) => {
                console.log("get wallet response 101", response);
                let receivedCANDY_deduction = response.data.data.receivedCANDY_deduction;
                let totalCandy = (response.data.data.candy_balance) + (response.data.data.claimed_reward_balance) + (response.data.data.claimed_staking_balance)
                let candyBalance = (totalCandy) - (receivedCANDY_deduction)


                if (response.data.code === 200) {

                    this.setState({
                        totalBalance: candyBalance

                    }, () => {
                        // console.log("totalBalance", this.state.totalBalance)
                    })
                }
            })
            .catch((error) => {

            })
    }
    handleChange(e) {
        var name = e.currentTarget.name;
        this.setState({ [name]: e.currentTarget.value, isVerfied: true })

    }
    // handleChangeSelect(id,e) {
    //      console.log("iiiid",id)
    //     var name = e.currentTarget.name;
    //     this.setState({ [name]: e.currentTarget.value, })


    // }
    handleChangeSelect = id => (event) => {
        console.log("123$$", id);
        console.log(event.target.value);
        var name = event.currentTarget.name;
        this.setState({ [name]: event.currentTarget.value, isVerfied: true })
    }

    Staking() {
        var Staking = {

            amount: (this.state.calculateBalance),
            period: parseInt(this.state.period1)
        }
        console.log("Staking", Staking)
        this.setState({ isVerfied: false })
        Axios.post("/addStaking", Staking, this.state.headers)
            .then((response) => {
                console.log("addStaking response", response)
                this.setState({ isVerfied: true })
                if (response.data.code === 200) {
                    toast.success("Stake successfull", {
                        position: "top-right"

                    });
                    this.setState({ calculateBalance: "", period: "", })
                    setTimeout(() => {
                        this.getStakingHistory();
                        this.toggle();

                    }, 3000)

                }
                if (response.data.code == 500) {
                    this.setState({ calculateBalance: "", period: "", })
                    toast.error(response.data.data, {
                        position: "top-right"

                    });


                }

            })
            .catch((error) => {
                console.log("error", error)
                this.setState({ isVerfied: true })
            })


    }
    toggle1(data) {
        console.log("staking id 371", data)

        var model = !this.state.openModal

        this.setState({
            openModal: model,
            data: data
        });




    }
    claimStaking() {
        // console.log("data 386",this.state.data)
        var claimStaking = {

            stakingId: this.state.data
        }
        console.log("claimStaking", claimStaking)

        Axios.post("/claimStaking", claimStaking, this.state.headers)
            .then((response) => {
                if (response.data.code == 200) {
                    toast.success(" Claim successfull", {
                        position: "top-right"

                    });
                    setTimeout(() => {
                        this.toggle1();
                        this.getStakingHistory();

                    }, 5000);





                } else if (response.data.code == 500) {
                    toast.success(response.data.data, {
                        position: "top-right"
                    });


                }



            })
            .catch((error) => {
                console.log("error", error)
            })



    }


    render() {
        // console.log("data 386",this.state.data)

        return (
            <>
                <Header />
                <div className='accountDetBg'>
                    <div className='container'>
                        <div className="listingbreatcrum">
                            <a href="/">Home</a> &nbsp;  &gt; &nbsp; <span>My Account</span>
                        </div>
                        <div className='persnol_DetOuter'>
                            <AccountNav />
                            <div className='personal_DetRight'>
                                <div className='userdetilsBx'>
                                    <div className='wishlistHd'>Staking</div>
                                    <div className='stakingOuter'>
                                        <div className='stakingTopBx'>
                                            <div className='stakingTopLeft'>
                                                <p>Stake your CANDY/Crypto and earn up to 14% APY</p>
                                                <span>Activation Period - 3Days<br />
                                                    Deactivation Period - 3 Days<br />
                                                    Early deactivation - Intrests earned will be deducted from staked amount.
                                                    Intrests will be paid out to your wallet daily.</span>
                                            </div>

                                            <div className='stakingtopRight'>
                                                <img src={stakingImg} alt='' />
                                                <span>
                                                    <a href='#checkHistory'>Check History</a>
                                                </span>
                                            </div>
                                        </div>
                                        <div className='staking_List'>
                                            <ul>
                                                {
                                                    this.state.staking && this.state.staking.length > 0 ?
                                                        this.state.staking.map((data, index) => {
                                                            // console.log("index", index)
                                                            return (

                                                                <li key={index}>
                                                                    <i>{data.images}</i>
                                                                    <span>
                                                                        <small>{data.apyName}</small>
                                                                        <small>{data.apyPerentage}</small>
                                                                    </span>
                                                                    <span>
                                                                        <small>{data.depositeName}</small>
                                                                        <small>{data.deposite}</small>
                                                                    </span>
                                                                    <span>
                                                                        <small>{data.earnName}</small>
                                                                        <small>{data.earn}</small>
                                                                    </span>
                                                                    <span>
                                                                        <small>{data.daysName}</small>
                                                                        <small>{data.days}</small>
                                                                    </span>

                                                                    <div className='approveInfpop'>
                                                                        <Button className='rejectbookingBtn  createwalletBtn bold' onClick={() => { this.toggle(data.id, index) }}>
                                                                            Stake
                                                                        </Button>
                                                                        <Modal isOpen={this.state.modal} id={data.id} toggle={() => this.toggle} className='modalOuter'>
                                                                            <Button className='popclose' onClick={this.toggle}>x</Button>

                                                                            <ModalBody >
                                                                                <div>
                                                                                    <div className='rejectbookingBody'>


                                                                                        <span style={{ fontSize: "30px" }}>Add Staking</span>
                                                                                        <div className="editfrmBx modelwidth">

                                                                                            <Label for="exampleEma">{(this.state.totalBalance.toLocaleString())}&nbsp;CANDY</Label>




                                                                                        </div>
                                                                                        <div className="editfrmBx modelwidth">
                                                                                            <FormGroup className="stakinput">
                                                                                                <Label for="exampleEma"> Amount </Label>
                                                                                                <Input type="text" name="calculateBalance" className=' ' id="emailError"
                                                                                                    value={this.state.calculateBalance}
                                                                                                    onChange={this.handleChange.bind(this)}



                                                                                                />
                                                                                            </FormGroup>
                                                                                        </div>
                                                                                        <div className='claimBtnsBx'>
                                                                                            <Button type="button" style={{ marginRight: '25px' }} onClick={() => this.calculatePer(25)}>25%</Button>
                                                                                            <Button type="button" style={{ marginRight: '25px' }} onClick={() => this.calculate(50)}>50%</Button>
                                                                                            <Button type="button" style={{ marginRight: '25px' }} onClick={() => this.calculate(75)}>75%</Button>
                                                                                            <Button type="button" style={{ marginRight: '25px' }} onClick={() => this.calculate(100)}>100%</Button>
                                                                                        </div>

                                                                                        <div className="editfrmBx modelwidth">
                                                                                            <FormGroup className="stakinput">
                                                                                                <Label for="exampleEma"> Period (Days) </Label>
                                                                                                <Input type="select"
                                                                                                    // name={"period1-" + data.id}
                                                                                                    name="period1"
                                                                                                    value={this.state.period1}

                                                                                                    //  value={this.state.period1[this.state.selectedcardindex]}

                                                                                                    onChange={this.handleChangeSelect(data.id)}

                                                                                                >

                                                                                                    <option value="30" >{data.period[0].p}</option>
                                                                                                    <option value="90">{data.period[1].p}</option>
                                                                                                    <option value="180" selected>{data.period[2].p}</option>
                                                                                                    <option value="360">{data.period[3].p}</option>


                                                                                                </Input>
                                                                                            </FormGroup>
                                                                                        </div>
                                                                                        <Button type="button" className="createwalletBtn bold" disabled={!this.state.isVerfied} onClick={this.Staking.bind(this)}>Staking</Button>
                                                                                    </div>
                                                                                    <ToastContainer />



                                                                                </div>

                                                                            </ModalBody>

                                                                        </Modal>
                                                                    </div>
                                                                </li>

                                                            )
                                                        })
                                                        :


                                                        null
                                                }
                                            </ul>
                                            <ul>
                                                <li className='disabled'>
                                                    <i><img src={LogoIcon} alt='' /></i>
                                                    <span>
                                                        <small>APY</small>
                                                        <small>8%</small>
                                                    </span>
                                                    <span>
                                                        <small>Deposit</small>
                                                        <small>CANDY</small>
                                                    </span>
                                                    <span>
                                                        <small>Earn</small>
                                                        <small>CANDY</small>
                                                    </span>
                                                    <span>
                                                        <small>Days</small>
                                                        <small>30D</small>
                                                    </span>
                                                    <a href=''>Coming Soon</a>
                                                </li>
                                                <li className='disabled'>
                                                    <i><img src={LogoIcon} alt='' /></i>
                                                    <span>
                                                        <small>APY</small>
                                                        <small>8%</small>
                                                    </span>
                                                    <span>
                                                        <small>Deposit</small>
                                                        <small>CANDY</small>
                                                    </span>
                                                    <span>
                                                        <small>Earn</small>
                                                        <small>CANDY</small>
                                                    </span>
                                                    <span>
                                                        <small>Days</small>
                                                        <small>30D</small>
                                                    </span>
                                                    <a href=''>Coming Soon</a>
                                                </li>
                                                <li className='disabled'>
                                                    <i><img src={LogoIcon} alt='' /></i>
                                                    <span>
                                                        <small>APY</small>
                                                        <small>8%</small>
                                                    </span>
                                                    <span>
                                                        <small>Deposit</small>
                                                        <small>CANDY</small>
                                                    </span>
                                                    <span>
                                                        <small>Earn</small>
                                                        <small>CANDY</small>
                                                    </span>
                                                    <span>
                                                        <small>Days</small>
                                                        <small>30D</small>
                                                    </span>
                                                    <a href=''>Coming Soon</a>
                                                </li>
                                                <li className='disabled'>
                                                    <i><img src={LogoIcon} alt='' /></i>
                                                    <span>
                                                        <small>APY</small>
                                                        <small>8%</small>
                                                    </span>
                                                    <span>
                                                        <small>Deposit</small>
                                                        <small>CANDY</small>
                                                    </span>
                                                    <span>
                                                        <small>Earn</small>
                                                        <small>CANDY</small>
                                                    </span>
                                                    <span>
                                                        <small>Days</small>
                                                        <small>30D</small>
                                                    </span>
                                                    <a href=''>Coming Soon</a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="tableCount" id="checkHistory" >
                                            <div className='totalcount'>Total: {this.state.totalDocuments}</div>

                                            <div className="perodFilter">
                                                <FormGroup>
                                                    <Label for="exampleSelect">Filter By:</Label>
                                                    <Input type="select" id="exampleSelect" name="daysFilter"
                                                        Value={this.state.daysFilter}
                                                        onChange={this.handleChangeSearch.bind(this)}
                                                    >
                                                        <option Value="">All</option>
                                                        <option Value="30">Last 30 Days</option>
                                                        <option Value="60">Last 60 Days</option>
                                                        <option Value="90">Last 90 Days</option>
                                                        <option Value="365">Last 1 Year </option>

                                                    </Input>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className='walletTableOuter'>
                                            <Table className="walletTable">
                                                <Thead>
                                                    <Tr>
                                                        <Th>Period (Days)</Th>
                                                        <Th>Amount</Th>
                                                        <Th>Apy </Th>
                                                        <Th>Start Date </Th>
                                                        <Th>End Date   </Th>
                                                        <Th>Created At</Th>
                                                        <Th>Daily Reward</Th>
                                                        <Th className='thalign'>Status</Th>
                                                        <Th className='thalign'>Actions</Th>


                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {
                                                        this.state.stakingData && this.state.stakingData.length > 0 ?
                                                            this.state.stakingData.map((data, index) => {
                                                                return (
                                                                    <Tr key={index}>
                                                                        <Td>{data.period}</Td>
                                                                        <Td>{data.amount.toLocaleString()}&nbsp;CANDY</Td>
                                                                        <Td>{data.apy} %</Td>
                                                                        <Td>{moment(data.startDate).format("LL")}&nbsp;
                                                                            <i className='walletStatus pending'>
                                                                                <IoIosInformationCircle />
                                                                                <span style={{ width: '150px', height: "100px" }}>Staking can only be start  after the 3 days of date of staking creation.</span>
                                                                            </i>
                                                                        </Td>
                                                                        <Td>{moment(data.endDate).format("LL")}</Td>
                                                                        <Td>{moment(data.createdAt).format("LLL")}
                                                                        </Td>
                                                                        <Td>{data.daily_reward.toLocaleString()}&nbsp;CANDY</Td>
                                                                        <Td align="center">

                                                                            {
                                                                                data && data.status === "CREATED" ?
                                                                                    <i className='walletStatus pending'>
                                                                                        <BsFillExclamationCircleFill />
                                                                                        <span>{data.status}</span>
                                                                                    </i>
                                                                                    : (data.status === "CLAIMED" ?

                                                                                        <i className='walletStatus1 pending' >
                                                                                            <BsFillExclamationCircleFill />
                                                                                            <span>{data.status}</span>
                                                                                        </i>
                                                                                        : (data.status === "ONGOING" ?

                                                                                            <i className='walletStatus2 pending' >
                                                                                                <BsFillExclamationCircleFill />
                                                                                                <span>{data.status}</span>
                                                                                            </i>
                                                                                            :
                                                                                            <i className='walletStatus3 pending' >
                                                                                                <BsFillExclamationCircleFill />
                                                                                                <span>{data.status}</span>
                                                                                            </i>
                                                                                        )
                                                                                    )
                                                                            }


                                                                        </Td>

                                                                        <Td>
                                                                            <div className='approveInfpop ' >
                                                                                {
                                                                                    data && data.status === "CREATED" ?
                                                                                        <Button className='rejectbookingBtn  createwalletBtn bold' style={{ minWidth: '82px' }} onClick={() => this.toggle1(data._id)}>
                                                                                            Claim
                                                                                        </Button>
                                                                                        : (data.status === "ONGOING" ?
                                                                                            <Button className='rejectbookingBtn  createwalletBtn bold' style={{ minWidth: '82px',background:"#008000"}}>
                                                                                                Claim
                                                                                            </Button>
                                                                                            : (data.status === "COMPLETED" ?
                                                                                                <Button className='rejectbookingBtn  createwalletBtn bold' style={{ minWidth: '82px', background: "#666", cursor: "none" }}>
                                                                                                    Claim
                                                                                                </Button>
                                                                                                :
                                                                                                <Button className='rejectbookingBtn  createwalletBtn bold' style={{ minWidth: '82px', background: "#666", cursor: "none" }}>
                                                                                                    Claim
                                                                                                </Button>
                                                                                            )


                                                                                        )



                                                                                }

                                                                                <Modal isOpen={this.state.openModal} toggle={this.toggle1} className='modalOuter'>
                                                                                    <Button className='popclose' onClick={this.toggle1}>x</Button>

                                                                                    <ModalBody >
                                                                                        <div>
                                                                                            <div className='rejectbookingBody' style={{ textAlign: 'center' }}>
                                                                                                <i style={{}}><AiOutlineWarning /></i>
                                                                                                <h2>Are You Sure?</h2>
                                                                                                <span>Do You Really Want to Claim ?</span><br />
                                                                                                <Button type="button" className="createwalletBtn bold" onClick={this.claimStaking.bind(this)}>Claim</Button>
                                                                                            </div>
                                                                                            <ToastContainer />



                                                                                        </div>

                                                                                    </ModalBody>

                                                                                </Modal>
                                                                            </div>



                                                                            {/* <Claim stakingId={data._id} /> */}




                                                                        </Td>
                                                                        {/* ============================= */}

                                                                    </Tr>

                                                                )
                                                            })
                                                            :
                                                            <tr>
                                                                <td colspan="8" align="center" style={{ marginTop: '0px' }}>Data not available </td>
                                                            </tr>
                                                    }
                                                </Tbody>
                                            </Table>
                                        </div>
                                        <div className="list_Pagination walletpagination">
                                            <ReactPaginate
                                                nextLabel="next"
                                                onPageChange={this.handlePageClick.bind(this)}
                                                pageRangeDisplayed={3}
                                                marginPagesDisplayed={2}
                                                pageCount={this.state.dataPerPage}
                                                previousLabel="previous"
                                                pageClassName="page-item"
                                                pageLinkClassName="page-link"
                                                previousClassName="page-item"
                                                previousLinkClassName="page-link"
                                                nextClassName="page-item"
                                                nextLinkClassName="page-link"
                                                activeClassName="active"
                                                renderOnZeroPageCount={null}
                                            />
                                        </div>



                                    </div>

                                </div>

                            </div>





                        </div>


                    </div>



                </div>


                <Footer />
            </>

        )
    }

}


