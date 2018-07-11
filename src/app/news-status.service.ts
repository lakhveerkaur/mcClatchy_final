import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { map } from 'rxjs/operators';
// import { Observable, throwError } from 'rxjs';
import { Observable, Subject, pipe} from 'rxjs';

const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type':  'application/json'
 })
};

@Injectable({
  providedIn: 'root'
})
export class NewsStatusService {

  sharingData:any[] = [

    {Story_id:'ST011',checked:false,Story:'The final marines to leave the US embassy in Yemen handed their weapons over to Houthi rebels',Received_on:'7/2/2018 10:28',Originally_Published:'7/2/2018 23:44',Current_Total_Reactions:'2400',
    Current_Total_Shares:'90',Predicted_Shares_in_24Hr:'3000',Action:'Approve',Assigned_to:'Editor',Status:'Verified',Result:'Fake',Trust_Index:'5.33'},

    {Story_id:'ST012',checked:false,Story:'Apple will charge more for the larger Apple Watch',Received_on:'7/2/2018 10:28',Originally_Published:'7/1/2018 23:44',Current_Total_Reactions:'2900',
    Current_Total_Shares:'38',Predicted_Shares_in_24Hr:'9000',Action:'Approve',Assigned_to:'Editor',Status:'Verified',Result:'True',Trust_Index:'4.11'},

    {Story_id:'ST001',Story:'NASA Scientist just confirmed that a giant asteroid will destroy Earth in 2019',Received_on:'7/4/2018 10:28',Originally_Published:'7/3/2018 23:44',Current_Total_Reactions:'1200',
    Current_Total_Shares:'53',Predicted_Shares_in_24Hr:'4000',Action:'Assign',Assigned_to:'',Status:'',Result:'',Trust_Index:''},

    {Story_id:'ST002',Story:'Doctors confirmed the first case of death by genetically modified food',Received_on:'7/4/2018 10:28',Originally_Published:'7/3/2018 23:44',Current_Total_Reactions:'1200',
    Current_Total_Shares:'40',Predicted_Shares_in_24Hr:'14000',Action:'Assign',Assigned_to:'',Status:'',Result:'',Trust_Index:''},

    {Story_id:'ST003',Story:'Iraqi army shot down two British planes that were delivering weapons to ISIS',Received_on:'7/4/2018 10:28',Originally_Published:'7/3/2018 23:44',Current_Total_Reactions:'2248',
    Current_Total_Shares:'20',Predicted_Shares_in_24Hr:'5000',Action:'Assign',Assigned_to:'',Status:'',Result:'',Trust_Index:''}

  ];

  constructor(private http: HttpClient) { }

  postStatus(data) {
    console.log("logs before post call---",data);
    return this.http.post('/saveStatus', {status: data})
                    .subscribe();
   }

   postDetails(data){

     console.log("details in service-->",data.comments);
     console.log("details in service-->",data.status);
     console.log("details in service-->",data.info);

     return this.http.post('/saveDetails', {status: data.status,comments:data.comments,info:data.info})
                     .subscribe();
   }
  getStatus(){
    let temp = this.http.get('/getStatus').pipe(map(response => response));
    //console.log(temp,"temp");
    return temp;

    // return this.http.get(this._getUrl)
    //                 .map(res => res.json());
  }

  setData(Assigned,status,result){
    let stories = this.sharingData.map((item, i) => {
      console.log('iten - > ', item.Story_id);
        if(item.Story_id == "ST001"){
          console.log('inside if');
          item["Assigned_to"] = Assigned;
          item["Status"] = status;
          item["Result"] = result;
        }
      return item;
    });
     this.sharingData = stories;
  }
  getStories(){
  console.log('get values -- > ', this.sharingData);
  return this.sharingData;
  }
}
