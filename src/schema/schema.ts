export const UserSchema={
    name:'User_Details',
    path:'Users',
    primarykey:'User_Id',
    properties:{
        User_Id:{type:'int', default:0},
        First_Name:'string',
        Last_Name:'string',
        Email:'string',
        City:'string',
        State:'string',
        Country:'string',
        Pincode:'string',
        Phone_Number:'string',
        PassWord:'string',
    }
};

 export const FeedSchema={
    name:'Feed',
    path:'feed',
    properties:{
        Id:'string',
        Title:'string',
        Description:'string',
        UrlToImage:'string',
        url:'string',
        Content:'string',
        Author:'string'
    }
}