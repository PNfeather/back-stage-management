<template>
    <div class="linkage">
        <el-select
            v-model="sheng"
            @change="choseProvince"
            placeholder="省级地区">
            <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.value"
                :value="item.id">
            </el-option>
        </el-select>
        <el-select
            v-model="shi"
            @change="choseCity"
            placeholder="市级地区">
            <el-option
                v-for="item in shi1"
                :key="item.id"
                :label="item.value"
                :value="item.id">
            </el-option>
        </el-select>
        <el-select
            v-model="qu"
            @change="choseBlock"
            placeholder="区级地区">
            <el-option
                v-for="item in qu1"
                :key="item.id"
                :label="item.value"
                :value="item.id">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        props: {
            originalAddress: {
                type: Object,
                default: () => {
                    return {
                        province: '',
                        city: '',
                        district: ''
                    };
                }
            },
          autoChoose: {
            type: Boolean,
            default: true
          }
        },
        data () {
            return {
                mapJson: '/static/json/map.json',
                province: '',
                sheng: '',
                shi: '',
                shi1: [],
                qu: '',
                qu1: [],
                city: '',
                block: '',
                outPutTimer: 0,
                baseUrl: ''
            };
        },
        computed: {
          shengName () {
              let shengName = this.sheng;
            /^[0-9]+$/.test(this.sheng) && this.province.forEach((o) => {
                  (o.id == this.sheng) && (shengName = o.value);
              });
              return shengName;
          },
          shiName () {
            let shiName = this.shi;
            /^[0-9]+$/.test(this.shi) && this.shi1.forEach((o) => {
              (o.id == this.shi) && (shiName = o.value);
            });
            return shiName;
          },
            quName () {
              let quName = this.qu;
                  /^[0-9]+$/.test(this.qu) && this.qu1.forEach((o) => {
                      (o.id == this.qu) && (quName = o.value);
                  });
                  return quName;
            }
        },
        watch: {
            sheng () {
                this.outPut();
            },
            shi () {
                this.outPut();
            },
            qu () {
                this.outPut();
            },
            originalAddress: {
                handler () {
                    this.getOriginal();
                },
                deep: true
            }
        },
        mounted () {
        },
        methods: {
            getOriginal () {
                  this.province.forEach((o) => {
                      (o.value == this.originalAddress.province) && (this.sheng = o.id);
                  });
                  this.originalAddress.province == '' && (this.sheng = '');
                  this.$nextTick(() => {
                    this.shi1.forEach((o) => {
                      (o.value == this.originalAddress.city) && (this.shi = o.id);
                    });
                    this.originalAddress.city == '' && (this.shi = '');
                    this.$nextTick(() => {
                      this.qu = this.originalAddress.district;
                    });
                  });
            },
            outPut () {
                if (this.outPutTimer) clearTimeout(this.outPutTimer);
                this.outPutTimer = setTimeout(() => {
                  this.$emit('input', {
                      district: this.quName,
                      province: this.shengName,
                      city: this.shiName
                  });
                }, 300);
            },
            // 加载china地点数据，三级
            getCityData () {
                let that = this;
                this.baseUrl = axios.defaults.baseURL;
                delete axios.defaults.baseURL;
                return axios.get(this.mapJson).then((response) => {
                    if (response.status == 200) {
                        let data = response.data;
                        that.province = [];
                        that.city = [];
                        that.block = [];
                        // 省市区数据分类
                        for (let item in data) {
                            if (item.match(/0000$/)) { // 省
                                that.province.push({id: item, value: data[item], children: []});
                            } else if (item.match(/00$/)) { // 市
                                that.city.push({id: item, value: data[item], children: []});
                            } else { // 区
                                that.block.push({id: item, value: data[item]});
                            }
                        }
                        // 分类市级
                        for (let index in that.province) {
                            for (let index1 in that.city) {
                                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                                    that.province[index].children.push(that.city[index1]);
                                }
                            }
                        }
                        // 分类区级
                        for (let item1 in that.city) {
                            for (let item2 in that.block) {
                                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                                    that.city[item1].children.push(that.block[item2]);
                                }
                            }
                        }
                        return Promise.resolve(true);
                    } else {
                        console.log(response.status);
                    }
                }).catch((error) => { console.log(typeof error); });
            },
            // 选省
            choseProvince (e) {
                for (let index2 in this.province) {
                    if (e === this.province[index2].id) {
                      this.shi1 = this.province[index2].children;
                      if (!this.autoChoose) {
                        this.shi = '';
                        this.qu1 = '';
                        this.qu = '';
                        this.E = '';
                      } else {
                        this.shi = this.province[index2].children[0].value;
                        this.qu1 = this.province[index2].children[0].children;
                        this.qu = this.province[index2].children[0].children[0].value;
                        this.E = this.qu1[0].id;
                      }
                    }
                }
            },
            // 选市
            choseCity (e) {
                for (let index3 in this.city) {
                    if (e === this.city[index3].id) {
                      this.qu1 = this.city[index3].children;
                      if (!this.autoChoose) {
                        this.qu = '';
                        this.E = '';
                      } else {
                        this.qu = this.city[index3].children[0].value;
                        this.E = this.qu1[0].id;
                      }
                    }
                }
            },
            // 选区
            choseBlock (e) {
                this.E = e;
            }
        },
        created () {
            this.getCityData().then((res) => {
              if (res) {
                  this.getOriginal();
              }
            });
            axios.defaults.baseURL = this.baseUrl;
        }
    };
</script>

<style scoped lang="less">
    .linkage{
        display: flex;
        justify-content: space-between;
        >div{
            flex: 30% 0 0;
        }
    }
</style>
