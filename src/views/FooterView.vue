<template>
    <div class="grid background-footer">
        <div class="col-12 lg:col-3 " style="display: flex; align-items: center;">
            <img src="../assets/img/0000DKRUB.png" class="img-logo" alt="">
        </div>
        <div class="col-6 md:col-4 lg:col-2 lg:mt-8">
            <h1 class="txt-head">เกี่ยวกับเรา</h1>
            <a href="#" class="txt-link">หน้าแรก</a><br>
            <a href="#" class="txt-link">สินค้าของเราทั้งหมด</a>
        </div>
        <div class="col-6 md:col-4 lg:col-3 lg:mt-8">
            <h1 class="txt-head">ที่อยู่บริษัท</h1>
            <p class="txt-link">458/2 ต.แม่เหียะ อ.เมืองเชียงใหม่ จ.เมืองเชียงใหม่ 55000</p>
        </div>
        <div class="col-6 md:col-4 lg:col-3 lg:mt-8">
            <h1 class="txt-head">ติดต่อเรา</h1>
            <p class="txt-link">ติดต่อเรา 0861234567</p>
        </div>


    </div>
</template>


<style scoped>
.txt-head{
    color: #ffff; -webkit-text-stroke: 1px;
}
.grid{
    margin-left: 0px;
    margin-right: 0px;
}
.background-footer{
    width: 100%;
    height: 300px;
    /* background: #f8090e; */
    background: linear-gradient(110deg, #f8090e 60%, #d40101 60%);
    margin-top: 5%;
}
.img-logo{
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    display: block;
}
.txt-link{
    font-size: 16px;
    color: #dad5d5;
    -webkit-text-stroke: 0.5px;
    
}
@media only screen and (max-width:922px){
    .img-logo{
    width: 10%;
}
}
@media only screen and (max-width:576px){
    .txt-head{
        font-size: 20px;
    }
 
    .img-logo{
    width: 30%;
    padding-bottom: 20px;
}
.background-footer{
    height: auto;
}
}
</style>



