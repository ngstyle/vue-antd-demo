<template>
  <div id="create-order">
    <a-page-header :style="{ margin: '-24px -24px 0', background: 'white' }" title="Create Order"
                   :breadcrumb="{
                     props: {
                       routes: [
                         { breadcrumbName: 'First-level Menu' },
                         { breadcrumbName: 'Second-level Menu' },
                       ],
                     },
                   }" />

    <div class="container">
      <!-- @change="onStepChange" -->
      <a-steps :current="current">
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template slot="title">Fill Basic Info.</template>
          <!-- <span slot="description"></span> -->
        </a-step>
        <a-step title="Select Properties." />
        <a-step title="Order Created." />
        <!-- <a-step title="Step 3" description="Order Created." /> -->
      </a-steps>

      <div v-if="current === 0" style="max-width: 600px; margin: 6% auto 0;">
        <!-- @submit="handleSubmit" -->
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout" label="Plan Name">
            <a-input v-decorator="[
              'planname',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              },
            ]" />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="Running Date">
            <!-- @ok="onOk" -->
            <a-range-picker :show-time="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm"
                            :placeholder="['Start Time', 'End Time']" @change="onChange"
                            v-decorator="[
                              'date',
                              {
                                rules: [
                                  {
                                    required: true,
                                    message: 'Please Select date!',
                                  },
                                ],
                              },
                            ]" />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="AD type">
            <a-radio-group name="radioGroup" :default-value="1" v-decorator="[
              'adtype',
              {
                rules: [
                  {
                    required: true,
                  },
                ],
              },
            ]">
              <a-radio :value="1">Screen</a-radio>
              <a-radio :value="2">Poster</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="Video Time">
            <a-input addon-after="s" default-value="30" v-decorator="[
              'videotime',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input video time!',
                  },
                ],
              },
            ]" />
          </a-form-item>

          <a-form-item v-bind="formItemLayout">
            <template slot="label" class="ant-col-sm-6">
              Poster number
              <a-tooltip title="how many posters per screen?">
                <a-icon type="question-circle-o" :style="{ verticalAlign: 'baseline' }" />
              </a-tooltip>
            </template>

            <a-checkbox @change="onChange">3 per Lift</a-checkbox>
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="Industry">
            <!-- @change="handleChange" -->
            <a-select default-value="category" style="width: 120px;">
              <a-select-option value="category">category</a-select-option>
              <a-select-option value="lucy">Lucyc</a-select-option>
              <a-select-option value="disabled" disabled>
                Disabled
              </a-select-option>
              <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select>

            <a-select default-value="sub-category" style="width: 160px; margin-left: 24px;">
              <a-select-option value="sub-category">
                sub-category
              </a-select-option>
            </a-select>
          </a-form-item>

          <!-- <div style="margin-top: 40px;text-align: center"> -->
          <a-button type="primary" style="margin-left: 25%; width: 120px;" @click="next">
            Next
          </a-button>
          <!-- </div> -->
        </a-form>
      </div>

      <div v-if="current === 1">
        <div class="card-container">
          <a-alert message="Filtered Building: 50, Tower: 200, Point: 520" type="info" close-text
                   :style="{ marginBottom: '16px' }" />

          <a-tabs type="card" default-active-key="1">
            <a-tab-pane key="1" tab="Region">
              <div>
                <span class="dimension">Area:</span>
                <a-checkbox :indeterminate="indeterminate" :checked="checkAll"
                            @change="onCheckAllChange">
                  All
                </a-checkbox>

                <a-checkbox-group v-model="checkedList" :options="plainOptions"
                                  @change="onChange" />
              </div>

              <div :style="{ marginTop: '24px' }">
                <span class="dimension">
                  Map selection
                  <a-tooltip title="Guide users to use the multi-circle feature">
                    <a-icon type="question-circle-o" :style="{ verticalAlign: 'baseline' }" />
                  </a-tooltip>&nbsp;:
                </span>
                <a-tag closable color="pink">
                  JMD megapolis (3km)
                </a-tag>
                <a-tag closable color="pink">
                  Cyber City (5km)
                </a-tag>
              </div>
              <div style="margin-top: 24px; text-align: center;">
                <a-button>Reset</a-button>
                <a-button type="danger" style="margin-left: 24px;">
                  Search
                </a-button>
              </div>
            </a-tab-pane>

            <a-tab-pane key="2" tab="Property">
              <div>
                <span class="dimension">Type:</span>
                <a-checkbox :indeterminate="indeterminate" :checked="checkAll"
                            @change="onCheckAllChange">
                  All
                </a-checkbox>

                <a-checkbox @change="onChange" checked>
                  Commercial
                </a-checkbox>

                <a-checkbox @change="onChange">Resident</a-checkbox>
              </div>

              <div style="margin-top: 16px;">
                <span class="dimension" :style="{ verticalAlign: 'middle' }">楼层数(Floor
                  number):</span>
                <a-input :style="{ width: '12%', verticalAlign: 'middle' }" size="small"
                         addon-after="more than" default-value="30" />
              </div>

              <div style="margin-top: 16px;">
                <span class="dimension" :style="{ verticalAlign: 'middle' }">入住率(Occupancy
                  rate):</span>
                <a-input :style="{ width: '12%', verticalAlign: 'middle' }" size="small"
                         addon-after="% more than" default-value="30" />
              </div>

              <div style="margin-top: 16px;">
                <span class="dimension" :style="{ verticalAlign: 'middle' }">房价区间/租金(House prices
                  &
                  rent):</span>
                <a-checkbox :indeterminate="indeterminate" :checked="checkAll"
                            @change="onCheckAllChange">
                  All
                </a-checkbox>

                <a-checkbox @change="onChange" checked>
                  1-1.5w
                </a-checkbox>

                <a-checkbox @change="onChange">1.5-2w</a-checkbox>
              </div>

              <div style="margin-top: 16px;">
                <span class="dimension" :style="{ verticalAlign: 'middle' }">物业费(Property
                  costs):</span>
                <a-input :style="{ width: '12%', verticalAlign: 'middle' }" size="small"
                         addon-after="以上(more than)" />
              </div>

              <div style="margin-top: 16px;">
                <span class="dimension" :style="{ verticalAlign: 'middle' }">楼龄(年)(Building age
                  (years)):</span>
                <a-checkbox :indeterminate="indeterminate" :checked="checkAll"
                            @change="onCheckAllChange">
                  All
                </a-checkbox>

                <a-checkbox @change="onChange" checked>
                  5年以内(less than 5)
                </a-checkbox>

                <a-checkbox @change="onChange">5-10年(5-10)</a-checkbox>

                <a-checkbox @change="onChange">10年以上(more than 10)</a-checkbox>
              </div>

              <div style="margin-top: 16px;">
                <span class="dimension" :style="{ verticalAlign: 'middle' }">车位(Parking
                  space):</span>
                <a-checkbox :indeterminate="indeterminate" :checked="checkAll"
                            @change="onCheckAllChange">
                  All
                </a-checkbox>

                <a-checkbox @change="onChange" checked>
                  小于200个(less than 200)
                </a-checkbox>

                <a-checkbox @change="onChange">200-500</a-checkbox>

                <a-checkbox @change="onChange">500以上(more than 500)</a-checkbox>
              </div>

              <div style="margin-top: 24px; text-align: center;">
                <a-button>Reset</a-button>
                <a-button type="danger" style="margin-left: 24px;">
                  Search
                </a-button>
              </div>
            </a-tab-pane>

            <a-tab-pane key="3" tab="Population Attributes">
              <div>
                <span class="dimension" :style="{ verticalAlign: 'middle' }">
                  性别占比(Gender ratio):
                </span>

                <a-checkbox @change="onChange">偏男性(Mostly male)</a-checkbox>

                <a-checkbox @change="onChange">偏女性(Mostly female)</a-checkbox>
              </div>

              <div style="margin-top: 16px;">
                <span class="dimension" :style="{ verticalAlign: 'middle' }">已婚情况占比(Percentage of
                  married):</span>

                <a-checkbox @change="onChange">偏多(more)</a-checkbox>

                <a-checkbox @change="onChange">偏少(less)</a-checkbox>
              </div>

              <div style="margin-top: 16px;">
                <span class="dimension" :style="{ verticalAlign: 'middle' }">教育水平占比(Percentage of
                  education level):</span>

                <a-checkbox @change="onChange">学历偏低(Low education)</a-checkbox>

                <a-checkbox @change="onChange">
                  学历中等(Medium education)
                </a-checkbox>

                <a-checkbox @change="onChange">
                  学历偏高(Height education)
                </a-checkbox>
              </div>

              <div style="margin-top: 16px;">
                <span class="dimension" :style="{ verticalAlign: 'middle' }">年龄占比(Age
                  ratio):</span>

                <a-checkbox @change="onChange">偏少年(Mostly children)</a-checkbox>

                <a-checkbox @change="onChange">偏青年Mostly young</a-checkbox>

                <a-checkbox @change="onChange">
                  偏中年(Mostly middle-aged)
                </a-checkbox>

                <a-checkbox @change="onChange">偏老年(Mostly elderly)</a-checkbox>
              </div>

              <div style="margin-top: 16px;">
                <span class="dimension" :style="{ verticalAlign: 'middle' }">私家车拥有情况占比(Percentage
                  of
                  private car ownership):</span>

                <a-checkbox @change="onChange">偏多(more)</a-checkbox>

                <a-checkbox @change="onChange">偏少(less)</a-checkbox>
              </div>

              <div style="margin-top: 16px;">
                <span class="dimension" :style="{ verticalAlign: 'middle' }">消费水平(Consumption
                  level):</span>

                <a-checkbox @change="onChange">
                  消费偏低(Low consumption)
                </a-checkbox>

                <a-checkbox @change="onChange">
                  消费中等(Medium consumption)
                </a-checkbox>

                <a-checkbox @change="onChange">
                  消费偏高(Height consumption)
                </a-checkbox>
              </div>

              <div style="margin-top: 16px;">
                <span class="dimension" :style="{ verticalAlign: 'middle' }">收入水平(Income
                  level):</span>

                <a-checkbox @change="onChange">收入偏低(Low income)</a-checkbox>

                <a-checkbox @change="onChange">收入中等(Medium income)</a-checkbox>

                <a-checkbox @change="onChange">收入偏高(Height income)</a-checkbox>
              </div>

              <div style="margin-top: 24px; text-align: center;">
                <a-button>Reset</a-button>
                <a-button type="danger" style="margin-left: 24px;">
                  Search
                </a-button>
              </div>
            </a-tab-pane>
          </a-tabs>

          <div style="margin-top: 16px; text-align: right;">
            <a-button style="width: 120px;" @click="prev">
              &lt;&lt; Previous
            </a-button>
            <div style="width: 24px; display: inline-block;" />
            <a-button type="primary" style="width: 120px;" @click="next">
              Create >>
            </a-button>
          </div>
        </div>

        <!-- <a-tabs default-active-key="1" :style="{marginTop: '24px'}">
        <a-tab-pane key="1" tab="Map View">
          <img src="../assets/map.png" style="width: 100%; margin-top: -16px" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="List View">Content of Tab Pane 2</a-tab-pane>
        </a-tabs>-->

        <a-card style="width: 100%; margin-top: 24px;" :tab-list="[
                  {
                    key: 'map',
                    tab: 'Map View',
                  },
                  {
                    key: 'list',
                    tab: 'List View',
                  },
                ]" :active-tab-key="noTitleKey"
                @tabChange="(key) => onTabChange(key, 'noTitleKey')">
          <template v-if="noTitleKey === 'map'">
            <img src="../assets/map.png" style="width: 100%;" @click="showDrawer" />
          </template>

          <div v-else-if="noTitleKey === 'list'">
            <a-table :columns="columns" :data-source="data">
              <a slot="name" slot-scope="text">{{ text }}</a>

              <span slot="customTitle">
                <a-icon type="smile-o" />Name
              </span>

              <span slot="tags" slot-scope="tags">
                <a-tag v-for="tag in tags" :key="tag" :color="
                  tag === 'loser'
                    ? 'volcano'
                    : tag.length > 5
                      ? 'geekblue'
                      : 'green'
                ">{{ tag.toUpperCase() }}</a-tag>
              </span>

              <span slot="action" slot-scope="text, record">
                <a>Invite 一 {{ record.name }}</a>
                <a-divider type="vertical" />
                <a>Delete</a>
                <a-divider type="vertical" />
                <a class="ant-dropdown-link">
                  More actions
                  <a-icon type="down" />
                </a>
              </span>
            </a-table>
          </div>
          <!-- <a slot="tabBarExtraContent" href="#">More</a> -->

          <a-drawer :visible="visible" class="drawer-container" :width="440" :closable="false"
                    :destroy-on-close="true" placement="right" @close="onClose">
            <a-carousel arrows autoplay>
              <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px; zindex: 1;">
                <a-icon type="left-circle" />
              </div>
              <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px;">
                <a-icon type="right-circle" />
              </div>

              <img src="https://s3.ap-south-1.amazonaws.com/res-bbmedia-in/1576055928944-20191127_094202.jpg"
                   style="height: 30vh;" />
              <img src="https://s3.ap-south-1.amazonaws.com/res-bbmedia-in/1576055929188-20191127_094344.jpg"
                   style="height: 30vh;" />
              <img src="https://s3.ap-south-1.amazonaws.com/res-bbmedia-in/1576055929379-20191127_094608.jpg"
                   style="height: 30vh;" />
            </a-carousel>

            <a-row style="padding: 24px 24px 16px;">
              <a-col :span="18">
                <h3 style="margin-bottom: 0;">JMD Megapolis</h3>
                <span>Sohna Rd, Sector 48, Gurugram, Haryana 122018</span>
              </a-col>
              <a-col :span="6" style="text-align: right;">
                <a-tag color="#f50" style="margin-right: 0;">
                  Commercial
                </a-tag>
              </a-col>
            </a-row>

            <a-list :grid="{ gutter: 0, column: 4 }" :data-source="[
              {
                title: 'Tower',
                count: 2,
              },
              {
                title: 'Lift',
                count: 12,
              },
              {
                title: 'Screen',
                count: 6,
              },
              {
                title: 'Poster',
                count: 36,
              },
            ]">
              <a-list-item slot="renderItem" slot-scope="item">
                <div style="text-align: center;">
                  <p style="color: red; font-weight: 500; margin-bottom: 0.2em;">
                    {{ item.count }}
                  </p>
                  <h5>{{ item.title }}</h5>
                </div>
              </a-list-item>
            </a-list>

            <div style="height: 12px; background-color: #f7f7f7;" />
            <div style="padding: 12px 24px;">
              <h3 style="margin-bottom: 0;">Basic Info</h3>
              <a-divider style="margin: 10px 0;" />
              <a-row style="padding: 2px 0;">
                <a-col :span="10" style="font-weight: 600;">
                  Delivery time:
                </a-col>
                <a-col :span="12">2010-01-01</a-col>
              </a-row>
              <a-row style="padding: 2px 0;">
                <a-col :span="10" style="font-weight: 600;">
                  Occupancy rate:
                </a-col>
                <a-col :span="12">80%</a-col>
              </a-row>

              <a-row style="padding: 2px 0;">
                <a-col :span="10" style="font-weight: 600;">
                  Lowest floor:
                </a-col>
                <a-col :span="12">12</a-col>
              </a-row>

              <a-row style="padding: 2px 0;">
                <a-col :span="10" style="font-weight: 600;">
                  Highest floor:
                </a-col>
                <a-col :span="12">12</a-col>
              </a-row>

              <a-row style="padding: 2px 0;">
                <a-col :span="10" style="font-weight: 600;">
                  Property costs:
                </a-col>
                <a-col :span="12">2.5 / square feet / month</a-col>
              </a-row>

              <a-row style="padding: 2px 0;">
                <a-col :span="10" style="font-weight: 600;">
                  Parking spaces:
                </a-col>
                <a-col :span="12">200</a-col>
              </a-row>

              <a-row style="padding: 2px 0;">
                <a-col :span="10" style="font-weight: 600;">
                  House price range:
                </a-col>
                <a-col :span="12">3-5</a-col>
              </a-row>

              <a-row style="padding: 2px 0;">
                <a-col :span="10" style="font-weight: 600;">
                  Average rent:
                </a-col>

                <a-col :span="12">3-5</a-col>
              </a-row>
            </div>

            <div style="height: 12px; background-color: #f7f7f7;" />

            <div style="padding: 12px 24px;">
              <a-row style="padding: 2px 0;">
                <a-col :span="10" style="font-weight: 600;">
                  Companies staying/Households:
                </a-col>
                <a-col :span="12">500</a-col>
              </a-row>
              <a-row style="padding: 2px 0;">
                <a-col :span="10" style="font-weight: 600;">
                  Covered people:
                </a-col>
                <a-col :span="12">5000</a-col>
              </a-row>
              <a-row style="padding: 2px 0;">
                <a-col :span="10" style="font-weight: 600;">
                  Taboo industry:
                </a-col>
                <a-col :span="12">-</a-col>
              </a-row>
            </div>
            <div style="height: 12px; background-color: #f7f7f7;" />

            <div style="padding: 12px 24px;">
              <h3 style="
                  margin-bottom: 0;
                  padding-left: 7px;
                  border-left: solid 3px #ff4d19;
                ">
                Gender Ratio
              </h3>
              <img src="../assets/g_ratio.png" style="width: 100%;" alt />
            </div>

            <div style="height: 12px; background-color: #f7f7f7;" />
            <div style="padding: 12px 24px;">
              <h3 style="
                  margin-bottom: 0;
                  padding-left: 7px;
                  border-left: solid 3px #ff4d19;
                ">
                Educational Distribution
              </h3>
              <img src="../assets/e_ratio.png" style="width: 100%;" alt />
            </div>

            <div style="height: 12px; background-color: #f7f7f7;" />
            <div style="padding: 12px 24px;">
              <h3 style="
                  margin-bottom: 0;
                  padding-left: 7px;
                  border-left: solid 3px #ff4d19;
                ">
                Age Distribution
              </h3>
              <img src="../assets/a_ratio.png" style="width: 100%;" alt />
            </div>

            <div style="height: 12px; background-color: #f7f7f7;" />
            <div style="padding: 12px 24px;">
              <h3 style="
                  margin-bottom: 0;
                  padding-left: 7px;
                  border-left: solid 3px #ff4d19;
                ">
                Income Level Distribution
              </h3>
              <img src="../assets/income_ratio.png" style="width: 100%;" alt />
            </div>

            <div style="height: 12px; background-color: #f7f7f7;" />
            <div style="padding: 12px 24px;">
              <h3 style="
                  margin-bottom: 0;
                  padding-left: 7px;
                  border-left: solid 3px #ff4d19;
                ">
                Consumption Level Distribution
              </h3>
              <img src="../assets/c_ratio.png" style="width: 100%;" alt />
            </div>

            <div style="height: 12px; background-color: #f7f7f7;" />
            <div style="padding: 12px 24px;">
              <h3 style="
                  margin-bottom: 0;
                  padding-left: 7px;
                  border-left: solid 3px #ff4d19;
                ">
                Marriage percentage
              </h3>
              <img src="../assets/m_ratio.png" style="width: 100%;" alt />
            </div>

            <div style="height: 12px; background-color: #f7f7f7;" />
            <div style="padding: 12px 24px;">
              <h3 style="
                  margin-bottom: 0;
                  padding-left: 7px;
                  border-left: solid 3px #ff4d19;
                ">
                Percentage of private cars
              </h3>
              <img src="../assets/car_ratio.png" style="width: 100%;" alt />
            </div>
          </a-drawer>
        </a-card>
      </div>

      <div v-if="current === 2" style="text-align: center; margin-top: 6%;">
        <a-icon type="exclamation" style="
            font-size: xxx-large;
            background: #3cbd2a;
            padding: 12px;
            border-radius: 50%;
            color: white;
          " />
        <p style="font-size: 24px; padding-top: 8px; color: #4d4d4d;">
          Created
          successfully
        </p>
        <div style="
            width: 50%;
            background: #fafafa;
            padding: 24px 48px;
            margin: auto;
          ">
          <a-row>
            <a-col :span="8" class="success-text">
              Plan Name:
            </a-col>
            <a-col :span="16" class="success-text">
              xxxxxx
            </a-col>

            <a-col :span="8" class="success-text">
              Running Date:
            </a-col>
            <a-col :span="16" class="success-text">
              2020-06-12 ~ 2020-09-15
            </a-col>

            <a-col :span="8" class="success-text">
              AD type:
            </a-col>
            <a-col :span="16" class="success-text">
              screen
            </a-col>

            <a-col :span="8" class="success-text">
              Video Time:
            </a-col>
            <a-col :span="16" class="success-text">
              15s
            </a-col>

            <a-col :span="8" class="success-text">
              Industry:
            </a-col>
            <a-col :span="16" class="success-text">
              FMCG / Food & Beverages
            </a-col>
          </a-row>
        </div>

        <div style="margin-top: 40px; text-align: center;">
          <a-button type="primary" @click="current = 0">
            继续创建(Another order)
          </a-button>
          <div style="width: 24px; display: inline-block;" />
          <a-button @click="next">查看订单(Check order)</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const plainOptions = ["Gurugaon", "Delhi", "Noida"];
const defaultCheckedList = ["Gurugaon", "Delhi"];

const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" },
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
export default {
  data() {
    return {
      data,
      columns,
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
      current: 0,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
      },
      noTitleKey: "map",
      visible: false,
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    onChange(checkedList) {
      this.indeterminate =
        !!checkedList.length && checkedList.length < plainOptions.length;
      this.checkAll = checkedList.length === plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    },
    onStepChange(current) {
      this.current = current;
    },
    onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
    },
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>

<style lang="less">
#create-order {
  .container {
    padding: 4% 10%;
    background: white;
    margin-top: 24px;
  }
  .card-container {
    margin-top: 3%;
    background: #f7f7f7;
    overflow: hidden;
    padding: 24px;
  }
  .card-container > .ant-tabs-card > .ant-tabs-content {
    /* height: 120px; */
    margin-top: -16px;
  }
  .card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
    background: #fff;
    padding: 16px;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar {
    border-color: #fff;
  }

  .card-container > .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    border-color: transparent;
    background: transparent;
  }

  .card-container
    > .ant-tabs.ant-tabs-card
    > .ant-tabs-bar
    .ant-tabs-tab-active {
    border-color: #fff;
    background: #fff;
  }
  .dimension {
    width: 24%;
    display: inline-block;
  }
  .success-text {
    text-align: left;
    padding: 8px 16px;
    font-size: 15px;
  }
  div.ant-card-body {
    padding: 0;
  }
  div.ant-card-head .ant-tabs-bar {
    border: none;
  }
  div.ant-card-bordered {
    border: 1px solid #f7f7f7;
  }
  div.ant-card-head {
    border-bottom: 1px solid #f7f7f7;
  }
}

.drawer-container {
  div.ant-drawer-body {
    padding: 0;
  }
  .ant-carousel > .slick-slider {
    text-align: center;
    background: #364d79;
    overflow: hidden;
  }
  .ant-carousel > .slick-slider h3 {
    color: #fff;
  }
  .custom-slick-arrow {
    z-index: 1;
    i {
      font-size: 24px;
      color: #fff;
      background-color: rgba(31, 45, 61, 0.11);
      opacity: 0.3;
    }
    i:hover {
      opacity: 0.6;
    }
  }
}
</style>
