/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-09-24 21:11:44
 * @Version: 1.0.0
 * @Description: 
 */
import React, {PureComponent} from 'react';
import { Form, Select, Modal, Input, Button, Spin,  message, Card, Icon, Checkbox } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
const { Meta } = Card;

let contractId = location.href.split("=")[1];
let needNotarization = location.href.split("=")[2];
let datas=[];
let datas2 =[];
let datas3=[];

@connect(({ CaseManage }) => ({
  CaseManage,
}))

export default class TemplateInitiatedPush extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      loading: false,
      visible: false,
      contractId: '',
      signerEnterprises: [],
      newDataEnterprises: [],
      signerPersons: [],
      details: {},
      contractSignList: [],
      // needNotarization: "N",
      company: false,
      index: 0,
      newIndex: 0,
      edit: false,
      checked: false,
      go: false,
      smallValue: "10",
      smallData: [],
    }
  }

  componentDidMount(){
    contractId = window.location.href.split("=")[1];
    needNotarization = location.href.split("=")[2];

    // if(sessionStorage && sessionStorage.params){
    //   this.setState({
    //    allData: JSON.parse(sessionStorage.params),
    //   },()=>{
    //     const { contractId, signerPersons, isNeedJustApply, signerEnterprises, smallData} =this.state.allData;
    //     signerPersons.map(item=>{
    //       item["signName"]=item["signatoryName"];
    //       item["signPhone"]=item["signatoryPhone"];
    //       item["signIdcard"]=item["signatoryIdcard"];
    //       item["signatoryType"] = "10";
    //       item["signType"] = "10";
    //       item["key"]= item["signatoryId"];
    //       return item;
    //     });
    //     datas=signerPersons;
       
    //     signerEnterprises.map(item=>{
    //       item["signatoryType"] = "11";
    //       item["signType"] = "11";
    //       item["key"]= item["signatoryId"];
    //       return item;
    //     });
    //     datas2=signerEnterprises;

    //     smallData.map(item=>{
    //       console.log(82,item)
    //       item["signatoryType"] = "12";
    //       item["signType"] = "12";
    //       item["key"]= item["signatoryId"];
    //       return item;
    //     });
    //     datas3=smallData;
    
    //     this.setState({
    //       contractId:contractId, 
    //       needNotarization: isNeedJustApply?isNeedJustApply: this.state.needNotarization,
    //       signerPersons,
    //       signerEnterprises,
    //       smallData,
    //     },()=>{
    //       // if(this.state.signerPersons.length===0 || this.state.signerEnterprises.length===0){
    //       //   this.setState({
    //       //     checked: false
    //       //   })
    //       // }else{
    //       //   this.setState({
    //       //     checked: true
    //       //   })
    //       // }
    //     });
        


    //   })
    // }else{
    // datas=[];
    // datas2=[];
    // datas3=[];
    // this.setState({ contractId:contractId, needNotarization:needNotarization,signerPersons:[],signerEnterprises:[],smallData:[]});
    // };
    datas=[];
    datas2=[];
    datas3=[];
    this.setState({ contractId:contractId, needNotarization:needNotarization,signerPersons:[],signerEnterprises:[],smallData:[]});
    if(sessionStorage && sessionStorage.checked){
      this.setState({
        checked: sessionStorage.checked==="true"?true:false
      })
    }

    MixinAjax.getPost(this.props.dispatch,'CaseManage/search',{
      "contractId": this.state.contractId,
      "stepPage": "ADD_SIGNER",
    },'',()=>{
      const { search:{respCode, respMsg, enterpriseInfoDTOs,  }} = this.props.CaseManage;
      if(respCode === "0000"){
        this.setState({
          newDataEnterprises: enterpriseInfoDTOs, 
        })
      }else{
        message.error(respMsg,1, message.destroy());
        this.setState({
          newDataEnterprises: [], 
        })
      }
    });
  }

  onChange = e =>{
    if(e.target.checked){
      datas=[]; datas2=[];datas=[];
      this.setState({
        signerEnterprises: [],
        signerPersons: [],
        smallData: [],
      });
    };
    this.setState({
      checked: e.target.checked
    });
    sessionStorage.checked = e.target.checked;

  };

  showModal = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({ visible: true, details: {},edit: false, });
  };

  handleEdit = (item, type) => {
    this.setState({ visible: true, loading: true, details: {}, edit: true,},()=>{    
      if(type==="11"){
        this.setState({
          company: 'true',
          details:item,
          loading: false,
        })
      }else{
        this.setState({
          company: 'false',
          details: item,
          loading: false
        })
      };
    });
  }

  handleDelete = (item, type) => {
   const { signerEnterprises, signerPersons, smallData } = this.state;
    if(type==="11"){
      let data = signerEnterprises.filter(value=>value.enterpriseId!==item.enterpriseId);
      datas2 = datas2.filter(value=>value.enterpriseId!==item.enterpriseId);
      this.setState({ signerEnterprises: data });
    }else if(type === "10"){
      let data = signerPersons.filter(value=>value.key!==item.key);
      datas = datas.filter(value=>value.key!==item.key);
      this.setState({ signerPersons: data });
    }else if(type === "12"){
      let data = smallData.filter(value=>value.enterpriseId!==item.enterpriseId);
      datas3 = datas.filter(value=>value.enterpriseId!==item.enterpriseId);
      this.setState({ smallData: data });
    }
  }

  handleCancel = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({ visible: false, details: {} ,edit: false,company: false,smallValue: "10"});
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    const { edit, newDataEnterprises } = this.state;
    
    console.log(224,this.state,this.props)

    form.validateFields((err, values) => {
      if (err) {
        return;
      }; 
      if(this.state.company === "true"){
     
        newDataEnterprises.map(item=>{
          if(item.enterpriseId===values.enterpriseId){
            values["enterpriseName"] = item.enterpriseName
          };
        });

        // if(this.state.go){
        if(this.state.smallValue==="11"){
          // datas2.map(item=>{
          //   if(item.enterpriseId===values.enterpriseId){
          //     message.error('同一主体不能添加多次',1,message.destroy());
          //   };
          //   return item;
          // });
          for(let i=0;i<datas2.length;i++){
            let data=datas2[i];
            if(data.enterpriseId===values.enterpriseId){
              message.error('同一主体不能添加多次',1,message.destroy());
              return;
            }
          };
          datas2.push({...values});
          this.setState({
            loading: false,
            visible: false,
          },()=>{
            this.setState({
              details: {},
              smallValue: "10",
              signerEnterprises: datas2,
              company: false,
            });
          })
        }

        if(this.state.smallValue==="12"){
          for(let i=0;i<datas3.length;i++){
            let data=datas3[i];
            if(data.enterpriseId===values.enterpriseId){
              message.error('同一主体不能添加多次',1,message.destroy());
              return;
            }
          };
         
          datas3.push({...values});
          this.setState({
            loading: false,
            visible: false,
          },()=>{
            this.setState({
              details: {},
              smallValue: "10",
              smallData: datas3,
              company: false,
            });
          })
        }
       
        // if(edit===false){
        //   console.log(178,this.state,newDataEnterprises,datas2)
        //   this.setState({
        //     newIndex: this.state.newIndex+1,
        //   },()=>{
        //     datas2.push({...values});
        //       this.setState({
        //         loading: false,
        //         visible: false,
        //         details: {},
        //         signerEnterprises: datas2,
        //         company: false,
        //       });
        //   })
         
        //   form.resetFields();
        // }else{
        //   console.log(181,this.state,newDataEnterprises,datas2);

        //   // datas2 =signerEnterprises.map(item=>{
        //   //   if(item["enterpriseId"]===values["enterpriseId"]){
        //   //     item = values;
        //   //   };
        //   //   return item;
        //   // });
        //   // this.setState({
        //   //   signerEnterprises: datas2,
        //   //   visible: false,
        //   //   details: {},
        //   // });
        //   form.resetFields();
        // };
       
        // MixinAjax.getPost(this.props.dispatch,'CaseManage/search',{
        //   ...values,
        //   "contractId": this.state.contractId,
        //   "stepPage": "ADD_SIGNER",
        // },'',()=>{
        //   const { search:{respCode, respMsg, enterpriseInfoDTOs,  }} = this.props.CaseManage;
        //   if(respCode === "0000"){
        //     this.setState({
        //       loading: false,
        //       visible: false,
        //       signerEnterprises: enterpriseInfoDTOs, 
        //       details: {},
        //     });
        //     form.resetFields();
        //   }else{
        //     this.setState({
        //       loading: false,
        //     },()=>{
        //       message.error(respMsg,1, message.destroy())
        //     })
        //   }
        // });
      }else{
        values["idCard"]=values["signIdcard"];
        values["mobile"]=values["signPhone"];
        values["userName"]=values["signName"];
        this.setState({
          loading: true,
        },()=>{
          MixinAjax.getPost(this.props.dispatch,'CaseManage/realnameandmobileauth',{
            ...values,
          },'',()=>{
            const { realnameandmobileauth:{respCode, respMsg, signId, isPassFlag }} = this.props.CaseManage;
            if(respCode === "0000"){
              if(edit===false){
                this.setState({
                  index: this.state.index+1,
                  loading: false,
                },()=>{
                  values["key"]=this.state.index;
                  datas.push({...values});
                  this.setState({
                    visible: false,
                  },()=>{
                    this.setState({
                      signerPersons: datas,
                      details: {},
                    });
                    form.resetFields();
                  })
                }); 
              }else{
                values["key"]=this.state.details.key;
                this.setState({
                  details: values,
                  loading: false,
                },()=>{
                  datas =this.state.signerPersons.map(item=>{
                    if(item["key"]===values["key"]){
                      item = values;
                    };
                    return item;
                  });
      
                  this.setState({
                    visible: false,
                  },()=>{
                    this.setState({
                      signerPersons: datas, 
                      details: {},
                    });
                    form.resetFields();
                  })
                })
              };
            }else{
              this.setState({
                loading: false,
              },()=>{
                message.error(respMsg,1,message.destroy())
              })
            }
          });
        }); 
      };
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  company = v =>{
    this.setState({
      company: v,
    })
  }

  go = v =>{
    this.setState({
      go: v,
    })
  }
  
  small = val=>{
    this.setState({
      smallValue: val,
    });
  }
  
  handleNext = ()=>{
    const { signerEnterprises, signerPersons, smallData, checked } =this.state;
    if(signerPersons.length===0 && signerEnterprises.length===0 && smallData.length===0){
      if(!checked){
        message.error('请先添加主体',1,message.destroy());
        return;
      };
    };
    if(signerEnterprises && signerEnterprises.length!==0){
      signerEnterprises.map(item=>{
        item["signType"] = "11"; 
        item["signatoryType"] = "11";
        item["signName"] = item.enterpriseName;
        return item;
      });
    };
    if(smallData && smallData.length!==0){
      smallData.map(item=>{
        item["signType"] = "12"; 
        item["signatoryType"] = "12";
        // item["signName"] = item.enterpriseName;
        return item;
      });
    };
    if(signerPersons && signerPersons.length!==0){
      signerPersons.map(item=>{
        item["signType"] = "10";
        item["signatoryType"] = "10";
        item["signatoryName"] = item.signName;
        item["signatoryIdcard"] = item.signIdcard;
        item["signatoryPhone"] = item.signPhone;
        return item;
      });
    };

    this.setState({
      loading: true,
      contractSignList: [...signerEnterprises,...signerPersons,...smallData],
    },()=>{
      MixinAjax.getPost(this.props.dispatch,'CaseManage/contractsigninfosave',{
         "contractSignList": this.state.contractSignList,
         "contractId": this.state.contractId,
       },'',()=>{
         const { contractsigninfosave:{respCode, respMsg, contractId }} = this.props.CaseManage;
         if(respCode === "0000"){
           this.setState({
             loading: false,
             contractId: contractId,
           },()=>{
             message.success(respMsg,1,()=>{
               this.props.dispatch(routerRedux.push(`/caseManage/caseLoan?contractId=${contractId}=${needNotarization}`));
             })
           });
         }else{
           this.setState({
             loading: false,
           },()=>{
            message.error(respMsg,1, message.destroy())
           })
         }
      })
    }); 
  }

  pre = ()=>{
    MixinAjax.getPost(this.props.dispatch,'CaseManage/commonQueryContractInfo',{
      "stepBtn": "L",
      "stepPage": "ADD_SIGNER",
      "contractId": this.state.contractId,
      "fileSort": "",
     },'',()=>{
      const {commonQueryContractInfo} = this.props.CaseManage;
      const { commonQueryContractInfo:{respCode, createMode, respMsg, backPage, contractDocBasicRes, contractDocJustApplyRes, contractId, contractName, isNeedJustApply, signerEnterprises, signerPersons }} = this.props.CaseManage;
      if(respCode === "0000"){
        this.setState({
          loading: false,
          contractId:contractId,
        },()=>{
          message.success(respMsg,1,()=>{
          sessionStorage.setItem("params", JSON.stringify(commonQueryContractInfo));
          this.props.dispatch(routerRedux.push(`/caseManage/templateInitiatedPush?id=${createMode}`));
          })
        });
      }else{
        //
      }
    });
  }

  render() {
    const { loading, signerPersons, signerEnterprises, smallData, edit, newDataEnterprises } = this.state;
    return (
      <PageHeaderLayout className="TemplateInitiatedPush">
        <Spin spinning={loading}>
          <div className="search" style={{margin: '20px 0', paddingBottom: 10, borderBottom: '1px solid #ccc'}}>
              <Button type="primary" ghost style={{marginRight: 10}} onClick={this.pre}>上一步</Button>
              <Button type="primary" ghost onClick={this.handleNext}>下一步</Button>
          </div>
          <div>
            <div>
              <Button type="primary" ghost onClick={this.showModal} style={{marginRight: 20}}>添加签约主体</Button>
              <Checkbox onChange={this.onChange} checked={this.state.checked} >不会签</Checkbox>
              </div>
            {
              signerPersons.length===0 || signerPersons===[]?"":
              <div style={{overflow: 'hidden'}}>
                {
                  this.state.signerPersons.map((item,index)=>{
                    return (
                      <Card
                        key={item.signatoryId}
                        id={item.enterpriseId}
                        hoverable
                        style={{ width: '32%', marginTop: 16, float: 'left', marginRight: '1%' }}
                        actions={[<div onClick={()=>{this.handleEdit(item,'10')}}><Icon type="edit" />   编辑</div>,<div onClick={()=>{this.handleDelete(item,"10" )}}><Icon type="user-delete" />  删除</div>]}
                      >
                        <Meta
                          title="个人主体"
                          description={
                            <div>
                              <div>姓名：{item.signName}</div>
                              <div>手机号：{item.signPhone}</div>
                              <div>身份证号：{item.signIdcard}</div>
                            </div>
                          }
                        />
                      </Card>
                    )
                  })
                }
              </div> 
            }
            {
              signerEnterprises.length===0 || signerEnterprises===[]?"":
              <div style={{overflow: 'hidden'}}>
                {
                  this.state.signerEnterprises.map((item,index)=>{
                    return (
                      <Card
                        key={item.enterpriseId}
                        id={item.enterpriseId}
                        hoverable
                        className="cards"
                        style={{ width: '31%', marginTop: 16, float: 'left', marginRight: '3%' }}
                        actions={[<div onClick={()=>{this.handleDelete(item,"11")}}><Icon type="user-delete" />  删除</div>]}
                      >
                        <Meta
                          title="企业主体"
                          description={
                            <div>
                              <div style={{height: 25,overflow: 'hidden'}}>名称：{item.enterpriseName}</div>
                            </div>
                          }
                        />
                      </Card>
                    )
                  })
                }
              </div> 
            }
            
            {
              smallData.length===0 || smallData===[] ?"":
              <div style={{overflow: 'hidden'}}>
                {
                  this.state.smallData.map((item,index)=>{
                    return (
                      <Card
                        key={item.enterpriseId}
                        id={item.enterpriseId}
                        hoverable
                        className="cards"
                        style={{ width: '31%', marginTop: 16, float: 'left', marginRight: '3%' }}
                        actions={[<div onClick={()=>{this.handleDelete(item,"12")}}><Icon type="user-delete" />  删除</div>]}
                      >
                        <Meta
                          title="小企业主体"
                          description={
                            <div>
                              <div >签约主体名称：{item.enterpriseName}</div>
                              <div >签约人姓名：{item.signName}</div>
                              <div >签约人手机：{item.legalPhone}</div>
                              <div >签约人身份证：{item.legalIdCard}</div>
                              <div >是否需要笔录：{item.isTranscript==="0"?"不需要":"需要"}</div>
                            </div>
                          }
                        />
                      </Card>
                    )
                  })
                }
              </div> 
            }
            
            <CollectionCreateForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={()=>{this.handleCreate()}}
              company={(v)=>{this.company(v)}}
              go={(v)=>{this.go(v)}}
              companyValue={this.state.company}
              goValue={this.state.go}
              details={this.state.details}
              edit= {edit}
              newDataEnterprises={newDataEnterprises?newDataEnterprises:[]}
              signerEnterprises={signerEnterprises?signerEnterprises:[]}
              smallData={smallData?smallData:[]}
              small={val=>{this.small(val)}}
              smallValue={this.state.smallValue}
            />

          </div>
        </Spin>
      </PageHeaderLayout>
    )
  }
}

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props){
      super(props);
      this.state ={
        company: props.companyValue,
        newSmallValue: props.smallValue,
        details: props.details,
        info: {},
      }
    }

    componentWillReceiveProps=(nextProps)=>{
      if( 'companyValue' in nextProps){
        this.setState({
          company: nextProps.companyValue==="true"? true: false,
        })
      }
      if( 'smallValue' in nextProps){
        this.setState({
          newSmallValue: nextProps.smallValue,
        })
      }
      if( 'details' in nextProps){
        this.setState({
          details: nextProps.details,
        })
      }
    }

    handleSelectChange = value => {
      if(this.props.visible){
        this.setState({
          info:{}
        })
      };
      if(value==="10"){
        this.setState({ company: false });
        this.props.company("false");
        this.props.small("10");
      }else if(value==="11"){

        this.setState({ company: true,  });
        this.props.company("true");
        this.props.small("11");
        if(this.props.signerEnterprises && this.props.signerEnterprises.length!==0){
          let only = this.props.signerEnterprises.filter(item=>item["enterpriseId"]===value);
          if(only && only.length!==0 && only[0]["enterpriseId"]){
            this.props.go(true)
          }else{
            this.props.go(false)
          }
        };
      }else if(value==="12"){

        this.setState({ company: true,newSmallValue: "12"  });
        this.props.small("12");
        this.props.company("true");

        // if(this.props.signerEnterprises && this.props.signerEnterprises.length!==0){
        //   let only = this.props.signerEnterprises.filter(item=>item["enterpriseId"]===value);
        //   if(only && only.length!==0 && only[0]["enterpriseId"]){
        //     this.props.go(true)
        //   }else{
        //     this.props.go(false)
        //   }
        // };
      }
    };
    //#endregion
    hand =val=>{
      this.props.newDataEnterprises.map((item,index)=>{
        if(item.enterpriseId === val){
          this.setState({
            info: item,
          })
        }
      })
    }


    render() {
      const { visible, onCancel, onCreate, form, details ,edit, newDataEnterprises} = this.props;
      const { company,newSmallValue,info } = this.state;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="添加签约主体"
          okText="保存"
          onCancel={onCancel}
          onOk={()=>{onCreate()}}
        >
          <Form layout="inline">
            
            <div style={{marginBottom: 10}}>
              <Form.Item label="签约主体的类型">
                {getFieldDecorator('signType', {
                  rules: [{ required: true, message: '请选择主体类型' }],
                  initialValue: details!=={}? details.signType: undefined
                })(
                  <Select style={{width: 200}} placeholder="请选择主体类型"  onChange={this.handleSelectChange} disabled={edit?true: false}>
                    {/* <Select.Option value="10">个人主体</Select.Option> */}
                    {/* <Select.Option value="11">企业主体</Select.Option> */}
                    <Select.Option value="12">小企业主体</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </div>

            <div style={{marginBottom: 10}}>
             {
               newSmallValue=="11" || newSmallValue=="12"?
               <Form.Item label="签约主体的名称">
                {getFieldDecorator('enterpriseId', {
                  rules: [{ required: true, message: '请选择主体的名称' }],
                  initialValue: details? details.enterpriseId: ""
                })(
                  <Select style={{width: 200}} placeholder="请选择主体的名称"  onChange={this.hand}  disabled={edit?true: false}>
                    {newDataEnterprises.map(item=>{
                      return (
                        <Select.Option key={item.enterpriseId} value={item.enterpriseId}>{item.enterpriseName}</Select.Option>
                      )
                    })
                  }
                  </Select>
                )}
              </Form.Item>
              :
               <Form.Item label="签约主体的姓名">
                {getFieldDecorator('signName', {
                  rules: [{ required: true, pattern: /^[\u2E80-\u9FFF]+$/, message: '请输入正确的姓名' }],
                  initialValue: details? details.signName: ""
                })(
                  <Input type="text" style={{width: 200}} placeholder="请输入正确的姓名" />
                )}
              </Form.Item>
             }
            </div>
            {
              newSmallValue=="10"?
              <div>
                <div style={{marginBottom: 10}}>
                  <Form.Item label="签约主体手机号">
                    {getFieldDecorator('signPhone', {
                      rules: [{ required: true,  pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, message: '请输入正确的手机号' }],
                      initialValue: details? details.signPhone: ""
                    })(
                      <Input type="text"  style={{width: 200}} placeholder="请输入正确的手机号"/>
                    )}
                  </Form.Item>
                </div>
                <div style={{marginBottom: 10}}>
                  <Form.Item label="签约主体身份证">
                    {getFieldDecorator('signIdcard', {
                      rules: [{ required: true, message: '请输入正确的身份证号', pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/  }],
                      initialValue: details? details.signIdcard: "",
                    })(
                      <Input type="text"  style={{width: 200}}  placeholder="请输入正确的身份证号"/>
                    )}
                  </Form.Item>
                </div>
            </div>:""
            }
            {
              newSmallValue=="12"?
              <div>
                <div style={{marginBottom: 10}}>
                    <Form.Item label="签约人姓名" style={{marginLeft:27}}>
                      {getFieldDecorator('signName', {
                        rules: [{ required: true,  message: '请输入签约人的姓名' }],
                        initialValue: info? info.legalPerson: ""
                      })(
                        <Input type="text"  style={{width: 200}} placeholder="请输入签约人姓名" disabled/>
                      )}
                    </Form.Item>
                  </div>
                <div style={{marginBottom: 10}}>
                  <Form.Item label="签约人手机" style={{marginLeft:27}}>
                    {getFieldDecorator('legalPhone', {
                      rules: [{ required: true,  pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, message: '请输入正确的手机号' }],
                      initialValue: info? info.legalPhone: ""
                    })(
                      <Input type="text"  style={{width: 200}} placeholder="请输入签约人手机号"/>
                    )}
                  </Form.Item>
                </div>
                <div style={{marginBottom: 10}}>
                  <Form.Item label="签约人身份证" style={{marginLeft:12}}>
                    {getFieldDecorator('legalIdCard', {
                      rules: [{ required: true, message: '请输入正确的身份证号', pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/  }],
                      initialValue: info? info.legalIdCard: "",
                    })(
                      <Input type="text"  style={{width: 200}}  placeholder="请输入签约人身份证" disabled/>
                    )}
                  </Form.Item>
                </div>
                <div style={{marginBottom: 10}}>
                  <Form.Item label="是否需要笔录" style={{marginLeft:12}}>
                    {getFieldDecorator('isTranscript', {
                      rules: [{ required: true, message: '请选择是否需要笔录' }],
                      initialValue: details? details.isTranscript: ""
                    })(
                      <Select
                        placeholder="请选择是否需要笔录"
                        style={{width: 200}}
                      >
                        <Select.Option value="0">不需要</Select.Option>
                        <Select.Option value="1">需要</Select.Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>
            </div>:""
            }
            
           
          </Form>
        </Modal>
      );
    }
  },
);
