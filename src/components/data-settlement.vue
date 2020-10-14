<template>
  <div>
      <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="fullPage"
        :width=200
        :height=200
        color="#2bb898"
        backgroundColor="#fff"
        :opacity= 0.5>
        </loading>
      </div>
      <data-component :megaCardContentHeader_title="title" :megaCardContentHeader_icon="icon">
          <template v-slot:megaCardContentHeader_button>
              <b-button class="btn-mega"><b-icon icon="plus-circle"></b-icon> Tambah Data</b-button>
          </template>
          
          <template v-slot:megaCardContentBody>
            <b-row>

                <b-col cols="12" sm="8" md="6" lg="8" class="text-right">
                    <b-form-group class="mb-0">
                        <b-input-group size="md">

                            <b-form-input
                                v-model="filter"
                                type="search"
                                id="filterInput"
                                placeholder="Cari Data Settlement"
                            >
                            </b-form-input>

                            <b-input-group-append>
                                <b-button 
                                :disabled="!filter" 
                                @click="filter = ''" 
                                class="rounded-0 btn-mega"
                                >
                                    <b-icon icon="search" class="form-icon"></b-icon>
                                </b-button>
                            </b-input-group-append>

                        </b-input-group>
                    </b-form-group>
                </b-col>
            
            
            
                <b-col cols="12" sm="4" offset-md="1" md="5" lg="3" class="mt-2 mt-sm-0">
                    <b-form-group
                    label="Show"
                    label-cols="2"
                    label-cols-sm="4"
                    label-cols-md="4"
                    label-cols-lg="5"
                    label-cols-xl="4"
                    >
                        <b-input-group size="md">
                            <b-form-select
                            style="cursor: pointer;"
                            v-model="perPage"
                            id="perPageSelect"
                            size="md"
                            :options="pageOptions"
                            ></b-form-select>

                            <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = ''" class="rounded-0 btn-mega"><b-icon icon="chevron-down"></b-icon></b-button>
                            </b-input-group-append>

                        </b-input-group>
                    </b-form-group>
                </b-col>
            
            </b-row>

            <b-row class="mt-3 px-4 mega-table-dashboard">
                <div class="table-responsive">
                    <b-table 
                        stacked="md"
                        :items="dataForm" 
                        class=" text-center table-bordered " 
                        hover 
                        :fields="fieldsTableDashboard" 
                        :filter="filter"
                        :per-page="perPage"
                        :current-page="currentPage"
                    >
                        <template v-slot:cell(no)="data">
                        {{ data.index + 1 }}
                        </template>
                        <template v-slot:cell(no._mobil)="data">
                        {{ data.item.fleet.no}}
                        </template>
                        <template v-slot:cell(tanggal)="data">
                        {{ data.item.date}}
                        </template>
                        <template v-slot:cell(supir)="data">
                        {{ data.item.driver.name}}
                        </template>
                        <template v-slot:cell(helper)="data">
                        {{ data.item.helper.name}}
                        </template>
                        <template v-slot:cell(kilometer_akhir)="data">
                        {{ mileAgeFormat(data.item.mileage)}}
                        </template>
                        <template v-slot:cell(saldo_e-toll)="data">
                        {{ data.item.emoney_balance | currency}}
                        </template>
                        <template v-slot:cell(uang_jalan)="data">
                        {{ data.item.pocket_money | currency}}
                        </template>
                        <template v-slot:cell(total_biaya)="data">
                        {{ data.item.totalCost | currency}}
                        </template>
                        <template v-slot:cell(sisa_uang_jalan)="data">
                        {{data.item.pocket_money - data.item.totalCost | currency}}
                        </template>
                        <template v-slot:cell(actions)="data">
                        <b-button class="btn-sm btn-mega-3 mr-1 mb-1" @click="editDataSettlement(data.item.id)"><b-icon-pencil></b-icon-pencil></b-button>
                        <b-button class="btn-sm btn-mega-2 mr-1 mb-1" @click="deleteDataSettlement(data.item.id)"><b-icon-trash></b-icon-trash></b-button>
                        </template>              
                        <template v-slot:cell(detail_biaya)="row">
                            <b-button class="btn-mega" style="cursor: pointer !important" size="sm" @click="row.toggleDetails">
                                {{ row.detailsShowing ? 'Sembunyikan' : 'Tampilkan' }}
                            </b-button>
                        </template>    
                        
                        <template v-slot:row-details="row">
                            <div class="mega-table-dashboard__bbm text-left mb-3 border-bottom pb-3" v-if="row.item.fuel_image_url != null ">
                                <h3 class="">* Jumlah Pengisian BBM :</h3>
                                <h1 class="pl-3">{{row.item.fuel_cost | currency}}</h1>
                                <h3 class="">* Dokumentasi Pengisian BBM :</h3>
                                <img class="pl-3" :src="row.item.fuel_image_url" alt="">
                            </div>
                            <div class="table-responsive">
                                <h3 class="text-left">* Detail Biaya </h3>
                                <table class="table-striped table-hover ml-auto text-center table-sm " width="100%">
                                <thead style="background: #2bb898; color: #fff;">
                                    <tr>
                                    <th>No</th>
                                    <th>Jenis Biaya</th>
                                    <th>Keterangan</th>
                                    <th>Jumlah Biaya</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(tb_biaya, index) in row.item.costs" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{tb_biaya.fleet_trip_cost_type_id.name}}</td>
                                    <td width="50%">{{tb_biaya.description}}</td>
                                    <td>{{tb_biaya.amount | currency}}</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </template> 
                        
                    </b-table>        
                </div>       
            </b-row> 

            <div class="mega-card-content-line mt-3"></div>     
            <b-col cols="12" md="6" offset-md="6" offset-lg="9" lg="3" class=" mt-3 mt-md-3 mt-lg-3 px-0">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="md"
                    class="my-0"
                ></b-pagination>
            </b-col>   
           


          </template>
          
      </data-component>
  </div>
</template>

<script>
import DataComponent from './data-component.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loading from 'vue-loading-overlay';
export default {
    components:{
        DataComponent,
        Loading
    },
    data(){
        return{
            title: 'Data Settlement',
            icon: 'table',
            isLoading: false,
            fullPage: true,
            filter: null,
            sortDesc: false,
            user:'',
            dataForm:[],
            dataCost:[],
            dataCostTypes:'',
            fieldsTableDashboardAdmin: ['no',{key: 'date',label: 'Tanggal', sortable: true},'supir','no._mobil', 'helper', 'kilometer_akhir', 'saldo_e-toll','uang_jalan', 'total_biaya', 'sisa_uang_jalan','detail_biaya', 'actions'],
            fieldsTableDashboardSupir: ['no',{key: 'date',label: 'Tanggal', sortable: true},'no._mobil', 'helper', 'kilometer_akhir', 'saldo_e-toll','uang_jalan', 'total_biaya', 'sisa_uang_jalan'],
            perPage: 10,
            pageOptions: [10, 25, 50],
            currentPage: 1,
            totalRows: 250,
            }
    },
    mounted() {
        this.userData(),
        this.loadDataSettlement()
    },

    computed: {
        fieldsTableDashboard(){
            let isAdmin = window.localStorage.getItem('admin')
            if(isAdmin == 'true'){
                return this.fieldsTableDashboardAdmin
            }else{
                return this.fieldsTableDashboardSupir
            }
        },
    },

     methods: {

        userData(){
            this.user = window.localStorage.getItem('name');
        },

        mileAgeFormat(value) {
            let val = (value/1).toFixed().replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },

        loadDataSettlement(){
            this.isLoading = true;
            var token = window.localStorage.getItem('token')
            var id = window.localStorage.getItem('id')
            console.log(id)
            let config = {
                headers: {
                'Authorization': 'Bearer ' + token
                }
            }

            axios.get('https://fleet.megatrend.xyz/api/fleet-trip/create?id=' + id,config).then(res => {
                console.log(res.data);
                this.dataCost = res.data;
                console.log('cek');
                console.log(this.dataCost)

                axios.get('https://fleet.megatrend.xyz/api/user/'+id,config).then(res => {
                console.log(res)

                
                this.dataForm = res.data.fleet_trips.reverse()

                res.data.fleet_trips.forEach((element) => element.costs.forEach((el) => el.fleet_trip_cost_type_id = this.dataCost.costTypes.find((e)=>{
                    return e.id == el.fleet_trip_cost_type_id
                })))
            
                console.log('cek')
                console.log(this.dataForm)
                console.log('cek')
                setTimeout(() => {
                            this.isLoading = false
                },500)
                }).catch ((err) => {
                console.log(err);
                })
            })
                
        },

        addDataSettlement(){
            this.$router.push('/form-settlement')
        },

        editDataSettlement(index){
            this.$router.push('form-settlement-update/'+index)
        },
        
        deleteDataSettlement(id){
            let token = window.localStorage.getItem('token')
            let config = {
                headers: {
                'Authorization': 'Bearer ' + token
                }
            }
            Swal.fire({
                title: 'Kamu yakin ?',
                text: "File yang telah dihapus tidak akan bisa muncul kembali !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Hapus'
            }).then((result) => {
                if (result.value) {
                axios.delete('https://fleet.megatrend.xyz/api/fleet-trip/'+id, config).then(res =>{
                console.log(res)
                    Swal.fire({
                    icon: 'success',
                    title: 'Data Berhasil Dihapus',
                    showConfirmButton: false,
                    timer: 1500
                    })  
                return this.loadDataSettlement()
                });        
                }
            })    
            },
    }
}
</script>

<style lang="scss">
.form-logo{
  width: 10rem;
}

.delete-row{
  color:red;
  font-weight: 800;
  cursor: pointer;
}

.page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #2bb898;
    border-color: #2bb898;
    
}
.page-item .page-link{
  outline: none;
    box-shadow: none !important;
}

.b-table-details{
  background: #e9edf1 !important;
  td{
    border: 0px !important;
  }
  th{
    border: 1px solid #fff !important;
  }
  .table-hover thead tr:hover th {
  color: #fff;
}
}

@media (min-width: 1600px) and (max-width: 2000px) {
  .mega-table-dashboard table{
    min-width: 1280px !important;
  }
}

@media (min-width: 1024px) and (max-width: 1365.98px) {
  .mega-table-dashboard table{
    width: 1000px !important;
    font-size: 90%;
  }
}

@media (min-width: 768px) and (max-width: 1023.98px) {
  .mega-table-dashboard table{
    width: 1000px !important;
    font-size: 90%;
  }
}

@media (max-width: 767.98px) {
  .mega-table-dashboard {

      table tr{
      margin-top: 20px;
      -webkit-box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29);
      -moz-box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29);
      box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29); 
    }
  }

    
  .b-table-details{
    table tr {
      -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    box-shadow: none !important;
    } 
  }
}

</style>