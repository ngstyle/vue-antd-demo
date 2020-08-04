<template>
  <div>
    <a-page-header :style="{margin: '-24px -24px 0', background: 'white'}" title="Building"
                   :breadcrumb="{ props: { routes: [
                     {breadcrumbName: 'First-level Menu'},
                     {breadcrumbName: 'Second-level Menu'}
                   ]}}">
      <template slot="extra">
        <a-button icon="upload">
          Upload
        </a-button>
      </template>
      <template slot="footer">
        <a-progress :percent="60" :stroke-width="6" :format="percent => `32 / 60`" status="active"
                    :stroke-color="{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }" />
      </template>
    </a-page-header>

    <div class="container">
      <a-card title="区域信息(Geographic Area)：">
        <a slot="extra" href="#">
          <a-icon @click="showModal" type="google" :style="{fontSize: '22px'}" />
        </a>
        <!-- <p>address / state / city / region(区域管理) / coordinate / pincode </p> -->
        <a-row :gutter="[16]">
          <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="8" :xl="6" :xxl="4">
            <a-form-item label="Address" required>
              <a-input disabled v-model="formattedAddress" placeholder="address" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="8" :xl="6" :xxl="4">
            <a-form-item label="State" required>
              <a-input disabled :value="geographicArea[1]?geographicArea[1].name: ''"
                       placeholder="state" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="8" :xl="6" :xxl="4">
            <a-form-item label="City" required>
              <a-input disabled :value="geographicArea[2]?geographicArea[2].name: ''"
                       placeholder="city" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="8" :xl="6" :xxl="4">
            <a-form-item label="Location" required>
              <a-input disabled :value="geographicArea[3]?geographicArea[3].name: ''"
                       placeholder="location" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="8" :xl="6" :xxl="4">
            <a-form-item label="Coordinates" required>
              <a-input disabled :value="coordinates" placeholder="coordinates" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="8" :xl="6" :xxl="4">
            <a-form-item label="Pincode" required>
              <a-input disabled :value="pincode" placeholder="pincode" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-modal :dialog-style="{minWidth: '520px'}" v-model="modalVisible"
                 :title="(formattedAddress || String.fromCharCode(160))" :width="'60vw'"
                 class="map-container" :mask-closable="false">
          <template slot="footer" :style="{background: 'red'}">
            <div :style="{margin:'8px 0 12px'}" v-if="addressComponents.length > 0">
              <a-checkable-tag :key="address.name" v-for="address in addressComponents" color="red"
                               :checked="address.checked" @change="() => handleChange(address)">
                {{ address.name }}
              </a-checkable-tag>
              <a-tooltip title="Must select 4 tags to locate the building!">
                <a-icon type="question-circle-o" :style="{color: 'red'}" />
              </a-tooltip>
            </div>
            <!-- <span v-if="pincode">Pincode: {{ pincode }}</span> -->
            <a-button type="primary" :disabled="!closable" size="small" :style="{width: '16%'}"
                      @click="modalVisible = false">
              OK
            </a-button>
          </template>

          <gmap-map ref="mapRef" :center="position || {lat:28.419581, lng:77.038085}" :zoom="zoom"
                    map-type-id="roadmap"
                    :options="{mapTypeControl: false, fullscreenControl: true,rotateControl: false,streetViewControl: false,}"
                    style="width: 100%; height: 50vh">
            <div slot="visible">
              <div style="top: 12px; left: 12px; width: 50%; position: absolute; z-index: 100">
                <gmap-autocomplete @place_changed="setPlace">
                  <template v-slot:input="slotProps">
                    <a-input :style="{width: '100%'}" outlined prepend-inner-icon="place"
                             @listeners="slotProps.listeners" @attrs="slotProps.attrs" allow-clear
                             placeholder="Search the building location..." ref="input">
                    </a-input>
                  </template>
                </gmap-autocomplete>
              </div>
            </div>

            <gmap-marker :position="position" :clickable="true" :draggable="true"
                         @dragend="dragend" />
          </gmap-map>
        </a-modal>
      </a-card>

      <a-card title="楼宇信息(Building info)：">
        <!-- Home Owner's Association fee / property fee.-->
        <!-- <p>
          Building Name / Building Type / Company name(地产公司) / Entry status(疫情期间的准入状态)
          Towers / Lifts / Lowest Floor / Hightest Floor / Basement /
          Company staying/Flats(入住公司/住户数) / Population(多少人每天) / Occupancy rate(入住率)
          Footfall / Selling Price(房价区间) / 租金(写字楼) / Building Age / HOA fee / 面积
        </p> -->
        <BuildingInfo />
      </a-card>

      <a-card title="点位信息(Resource Info)：">
        <!-- <p>Lifts / Screens / Posters / Projectors / Magic posters / Standing Screen</p> -->
        <ResourceInfo />
      </a-card>

      <a-card title="人群属性(Attributes)：">
        <!-- <p>
          Category(楼宇等级) / Income / consumption / gender / age / education / marriage / vehicle
        </p> -->
        <Attribute />
      </a-card>

      <a-card title="签约信息(Sign Info)：">
        <SignInfo />
      </a-card>

      <a-card title="物业联系人信息(Property contact information):">
        <PropertyContact />
      </a-card>

      <a-card title="标签信息(Building Tags)：">
        <p>1. List published ads(industrial) and count in this building!</p>
        <p>2. According to history published data, select tags from tag pool!</p>
        <p>3. According to other dimensions, select tags from tag pool!</p>
      </a-card>

      <a-card title="备注(remarks):">
        <a-textarea placeholder="Remarks" :rows="4" />
      </a-card>

      <div class="submit-container">
        <a-button type="primary" :style="{padding: '0 32px'}">
          Submit
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import BuildingInfo from "./building/BuildingInfo";
import ResourceInfo from "./building/ResourceInfo";
import Attribute from "./building/Attribute";
import SignInfo from "./building/SignInfo";
import PropertyContact from "./building/PropertyContact";
import { gmapApi } from "vue2-google-maps-withscopedautocomp";

export default {
  components: {
    BuildingInfo,
    ResourceInfo,
    Attribute,
    SignInfo,
    PropertyContact,
  },
  data() {
    return {
      modalVisible: false,
      position: null,
      formattedAddress: "",
      zoom: 14,
      addressComponents: [],
      pincode: "",
      closable: false,
    };
  },
  computed: {
    google: gmapApi,
    coordinates: function () {
      return this.position ? `${this.position.lat}, ${this.position.lng}` : "";
    },
    geographicArea: function () {
      return this.addressComponents.filter((a) => a.checked);
    },
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
    setPlace(place) {
      // console.log(place);
      this.zoom = 17;
      this.position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      // https://developers.google.com/places/supported_types
      // https://developers.google.com/maps/documentation/geocoding/overview#Types
      this.formattedAddress = place.formatted_address;
      this.addressComponents.length = 0;
      for (const addressComponent of place.address_components?.reverse()) {
        // console.log(addressComponent);

        const types = addressComponent.types;
        const name = addressComponent.long_name;
        if (types.includes("postal_code")) {
          console.log("pincode here");
          this.pincode = name;
        } else {
          this.addressComponents.push({
            types,
            name: addressComponent.long_name,
            checked:
              types.includes("country") ||
              types.includes("administrative_area_level_1"),
          });
        }
      }
    },
    dragend(place) {
      this.closable = false;
      this.position = {
        lat: place.latLng.lat(),
        lng: place.latLng.lng(),
      };

      // fetch place details after dragend
      new this.google.maps.Geocoder().geocode(
        {
          latLng: this.position,
        },
        (responses) => {
          console.log(responses);
          if (responses && responses.length > 0) {
            // marker.formatted_address = responses[0].formatted_address;
            const response =
              responses.find((r) => r.types.includes("route")) || responses[0];
            console.log(response.formatted_address);
            this.formattedAddress = response.formatted_address;

            this.addressComponents.length = 0;
            for (const addressComponent of response.address_components?.reverse()) {
              const types = addressComponent.types;
              const name = addressComponent.long_name;
              if (types.includes("postal_code")) {
                console.log("pincode here");
                this.pincode = name;
              } else {
                this.addressComponents.push({
                  types,
                  name: addressComponent.long_name,
                  checked:
                    types.includes("country") ||
                    types.includes("administrative_area_level_1"),
                });
              }
            }
          } else {
            console.log("Cannot determine address at this location.");
            // marker.formatted_address =
            //   "Cannot determine address at this location.";
          }
          // infowindow.setContent(
          //   marker.formatted_address +
          //     "<br>coordinates: " +
          //     marker.getPosition().toUrlValue(6)
          // );
          // infowindow.open(map, marker);
        }
      );
    },
    handleChange(address) {
      let checkedCount = this.addressComponents.filter((a) => a.checked).length;
      if (checkedCount === 4 && !address.checked) {
        console.log("4 tags already checked.");
        return;
      }
      if (
        address.types.includes("country") ||
        address.types.includes("administrative_area_level_1")
      ) {
        console.log("country & administrative_area_level_1 must be selected.");
        return;
      }
      address.checked = !address.checked;

      checkedCount = this.addressComponents.filter((a) => a.checked).length;
      this.closable = checkedCount === 4;
    },
  },
};
</script>

<style>
.container {
  /* padding: 24px; */
  /* background: white; */
  margin-top: 24px;
}
.map-container .ant-modal-body {
  padding: 0;
}
div.ant-card {
  margin: 16px 0;
}
.submit-container {
  height: 64px;
  background: #ccc1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  padding-right: 24px;
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
}
div.ant-tag-checkable {
  border-color: #d9d9d9;
  /* background-color: #fafafa; */
}
div.ant-tag-checkable-checked {
  background-color: #f50;
}
div.ant-tag-checkable:not(.ant-tag-checkable-checked):hover {
  color: #f50;
}
div.ant-page-header-footer {
  width: 72%;
  margin-top: 0;
  padding: 4px 0 8px;
}
</style>