<template>
    <div class="fillcontain">
        <el-dialog
            title="运费模板"
            :visible.sync="dialog.carriage"
        >
            <el-table
                :data="detailEntity.ExpressTemplate"
                border
                max-height="450"
            >
                <el-table-column
                    property="Type"
                    label="方式"
                    width=""
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="Area"
                    label="范围"
                    width=""
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="Start"
                    label="首重（KG）"
                    width=""
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="Augment"
                    label="每增加重量（KG）"
                    width=""
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="AugmentPrice"
                    label="加收（元）"
                    width=""
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="isDefault"
                    label="是否默认"
                    width="80"
                    align="center"
                >
                    <template slot-scope="scope">{{ scope.row.isDefault == 0 ? '否' : '是' }}</template>
                </el-table-column>
                <el-table-column
                    property="isExcludeArea"
                    label="不派送地区"
                    width="100"
                    align="center"
                >
                    <template slot-scope="scope">{{ scope.row.isExcludeArea == 0 ? '否' : '是' }}</template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog
            title="上门安装服务模板"
            :visible.sync="dialog.visitInstall"
        >
            <el-table
                :data="service.visitInstallList"
                border
                max-height="450"
            >
                <el-table-column
                    property="AreaName"
                    label="区域"
                    width=""
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="Price"
                    label="安装费用"
                    width=""
                    align="center"
                ></el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog
            title="搬楼服务模板"
            :visible.sync="dialog.move"
        >
            <el-table
                :data="service.moveList"
                border
                max-height="450"
            >
                <el-table-column
                    property="AreaName"
                    label="区域"
                    minWidth="300"
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="FirstUnit"
                    label="首重(Kg)"
                    width=""
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="FirstPrice"
                    label="首费(元)"
                    width=""
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="AddUnit"
                    label="续重(Kg)"
                    width=""
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="AddPrice"
                    label="续件(元)"
                    width=""
                    align="center"
                ></el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog
            title="同城配送服务模板"
            :visible.sync="dialog.citySend"
        >
            <el-table
                :data="service.citySendList"
                border
                max-height="450"
            >
                <el-table-column
                    property="AreaName"
                    label="区域"
                    minWidth="300"
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="FirstUnit"
                    label="首重(Kg)"
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="FirstPrice"
                    label="首费(元)"
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="AddUnit"
                    label="续重(Kg)"
                    align="center"
                ></el-table-column>
                <el-table-column
                    property="AddPrice"
                    label="续件(元)"
                    align="center"
                ></el-table-column>
            </el-table>
        </el-dialog>
        <el-card class="box-card">
            <div slot="header">
                <b>商品审核详情</b>
                <audit-history-drawer
                    v-bind:auditTypeResult="auditTypeResult"
                    v-bind:keyName="'type'"
                ></audit-history-drawer>
            </div>
            <div class="text item mb30">
                <div>
                    <el-tabs
                        v-model="activeName"
                        type="card"
                    >

                        <el-tab-pane
                            label="基本资料"
                            name="base"
                        >
                            <el-form
                                label-width="150px"
                                size="mini"
                            >
                                <el-form-item label="商品类目：">{{ detailEntity.SysCate }}</el-form-item>
                                <el-form-item label="商品自定义类目：">{{ detailEntity.CustomCate }}</el-form-item>
                                <el-form-item label="商品名称：">{{ detailEntity.Title }}</el-form-item>
                                <el-form-item label="商品卖点：">{{ detailEntity.SellPoint }}</el-form-item>
                                <el-form-item label="商品品牌：">
                                    <viewer :images="[detailEntity.BrandLogo]">
                                        <img
                                            :src="detailEntity.BrandLogo"
                                            class="imgwh"
                                        >
                                    </viewer>
                                </el-form-item>
                                <el-form-item label="自动上架时间：">{{ !detailEntity.AutoPutawayTime || detailEntity.AutoPutawayTime.startsWith('0001') ? '-' : detailEntity.AutoPutawayTime }}</el-form-item>
                                <el-form-item label="自动下架时间：">{{ !detailEntity.AutoPutawayTime || detailEntity.AutoSoldOutTime.startsWith('0001') ? '-' : detailEntity.AutoSoldOutTime }}</el-form-item>
                            </el-form>

                            <el-form
                                label-width=""
                                size="mini"
                                class="mt20"
                            >
                                <el-form-item label="">
                                    审核操作记录
                                    <el-tooltip placement="right">
                                        <div slot="content">
                                            <p>1.对应操作后需要勾选对应的选项</p>
                                            <p>注意：需要点击暂存才会保存进度</p>
                                        </div>
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                </el-form-item>
                                <el-form-item
                                    label=""
                                    label-width="50px"
                                >
                                    <ul>
                                        <li>
                                            <el-checkbox
                                                v-model="verify.base.verifyList"
                                                label="Verify_101"
                                            >商品分类信息核查</el-checkbox>
                                        </li>
                                        <li>
                                            <el-checkbox
                                                v-model="verify.base.verifyList"
                                                label="Verify_102"
                                            >商品名称违禁内容核查</el-checkbox>
                                        </li>
                                        <li>
                                            <el-checkbox
                                                v-model="verify.base.verifyList"
                                                label="Verify_103"
                                            >商品名称与实际售卖商品一致性核查</el-checkbox>
                                        </li>
                                        <li>
                                            <el-checkbox
                                                v-model="verify.base.verifyList"
                                                label="Verify_104"
                                            >上下架时间核查</el-checkbox>
                                        </li>
                                    </ul>
                                </el-form-item>
                            </el-form>
                            <el-row v-if="isAudit">
                                <el-divider></el-divider>
                                <p class="mt20">审核结论：</p>
                                <el-form
                                    label-width="50px"
                                    size="mini"
                                    class="audit-result-form"
                                >
                                    <el-form-item label="">
                                        <el-radio
                                            v-model="auditTypeResult.base.audit_status"
                                            :label="1"
                                        >通过</el-radio>
                                        <el-radio
                                            v-model="auditTypeResult.base.audit_status"
                                            :label="0"
                                        >不通过</el-radio>
                                    </el-form-item>
                                    <el-form-item
                                        v-if="auditTypeResult.base.audit_status === 0"
                                        class="audit-result"
                                    >
                                        <el-col
                                            :span="12"
                                            class="print-result"
                                        >
                                            <vue-scroll>
                                                <el-input
                                                    type="textarea"
                                                    :autosize="true"
                                                    placeholder="请输入不通过理由"
                                                    v-model="auditTypeResult.base.audit_remark"
                                                ></el-input>
                                            </vue-scroll>
                                        </el-col>
                                        <el-col :span="12">
                                            <ul>
                                                <vue-scroll>
                                                    <li
                                                        v-for="(result, idx) in resultSelect.base"
                                                        :key="idx"
                                                        @click="auditTypeResult.base.audit_remark += result"
                                                    >
                                                        {{ result }}
                                                    </li>
                                                </vue-scroll>
                                            </ul>
                                        </el-col>
                                    </el-form-item>
                                </el-form>
                            </el-row>

                        </el-tab-pane>

                        <el-tab-pane
                            label="规格属性"
                            name="specAttr"
                        >
                            <el-form label-width="150px">
                                <el-form-item label="商品规格：">
                                    <el-table
                                        :data="goodsSpecifications"
                                        border
                                        stripe
                                        size="small"
                                        style="width: 100%"
                                    >
                                        <el-table-column
                                            type="index"
                                            :index="indexMethod"
                                            align="center"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            property="image"
                                            label="图片"
                                            align="center"
                                            width="70"
                                        >
                                            <template slot-scope="scope">
                                                <viewer :images="[scope.row.Img]">
                                                    <img
                                                        :src="scope.row.Img"
                                                        style="width: 30px; height: 30px;"
                                                    />
                                                </viewer>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            property="ProductNo"
                                            label="商品编码"
                                            align="center"
                                            minWidth="130"
                                        ></el-table-column>
                                        <el-table-column
                                            property="Count"
                                            label="总库存"
                                            align="center"
                                            width="70"
                                        ></el-table-column>
                                        <el-table-column
                                            property="SpecText"
                                            label="规格"
                                            align="center"
                                            minWidth="260"
                                            show-overflow-tooltip
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            property="MarkPrice"
                                            label="市场价"
                                            align="center"
                                            width="100"
                                        >
                                            <template slot-scope="scope">
                                                <span class="price">{{ scope.row.MarkPrice ? `￥${scope.row.MarkPrice}` : '-'}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            property="SellPrice"
                                            label="销售价"
                                            align="center"
                                            width="100"
                                        >
                                            <template slot-scope="scope">
                                                <span class="price">{{ scope.row.SellPrice ? `￥${scope.row.SellPrice}` : '-'}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-form-item>
                                <el-form-item label="商品属性：">
                                    <ul
                                        class="commodityAttributes"
                                        v-if="detailEntity.Attribute"
                                    >
                                        <li
                                            v-for="(n, idx) in detailEntity.Attribute"
                                            :key="idx"
                                        >
                                            <p>{{ n.SkuKey }}：</p>
                                            <span>{{ n.SkuValue }}</span>
                                        </li>
                                    </ul>
                                </el-form-item>
                                <el-form-item label="包邮：">
                                    <span>满 <font class="make-money">￥{{ detailEntity.Is_withoutPostage ? detailEntity.Is_withoutPostage : '-' }}</font> 包邮</span>
                                </el-form-item>
                                <el-form-item label="运费：">
                                    运费模板：
                                    <span
                                        class="exp"
                                        v-for="(value, key, idx) in detailEntity.TransportationExpense"
                                        :key="idx"
                                    >{{ `${key}： ${value}` }}</span>
                                    <el-button
                                        type="text"
                                        @click="dialog.carriage = true"
                                    >查看模板</el-button>
                                </el-form-item>
                                <el-form-item label="提供服务：">
                                    <ul v-if="detailEntity.SpecialInfo">
                                        <li v-if="service.visitInstallList.length > 0">
                                            上门安装服务：
                                            <el-button
                                                type="text"
                                                @click="dialog.visitInstall = true"
                                            >查看模板</el-button>
                                        </li>
                                        <li v-if="service.moveList.length > 0">
                                            搬楼服务：
                                            <el-button
                                                type="text"
                                                @click="dialog.move = true"
                                            >查看模板</el-button>
                                        </li>
                                        <li v-if="service.citySendList.length > 0">
                                            同城配送服务：
                                            <el-button
                                                type="text"
                                                @click="dialog.citySend = true"
                                            >查看模板</el-button>
                                        </li>
                                        <li v-if="service.cutPrice">
                                            裁剪服务：服务费用：{{ service.cutPrice }}元
                                        </li>
                                    </ul>
                                    <span v-else>无</span>
                                </el-form-item>
                            </el-form>

                            <div class="mt20">
                                <el-form
                                    label-width=""
                                    size="mini"
                                    class="mt20"
                                >
                                    <el-form-item label="">
                                        审核操作记录
                                        <el-tooltip placement="right">
                                            <div slot="content">
                                                <p>1.对应操作后需要勾选对应的选项</p>
                                                <p>注意：需要点击暂存才会保存进度</p>
                                            </div>
                                            <i class="el-icon-question"></i>
                                        </el-tooltip>
                                    </el-form-item>
                                    <el-form-item
                                        label=""
                                        label-width="50px"
                                    >
                                        <ul>
                                            <li>
                                                <el-checkbox
                                                    v-model="verify.specAttr.verifyList"
                                                    label="Verify_201"
                                                >商品规格核实</el-checkbox>
                                            </li>
                                            <li>
                                                <el-checkbox
                                                    v-model="verify.specAttr.verifyList"
                                                    label="Verify_202"
                                                >商品属性核实</el-checkbox>
                                            </li>
                                            <li>
                                                <el-checkbox
                                                    v-model="verify.specAttr.verifyList"
                                                    label="Verify_203"
                                                >商品运费核实</el-checkbox>
                                            </li>
                                        </ul>
                                    </el-form-item>
                                </el-form>
                                <el-row v-if="isAudit">
                                    <el-divider></el-divider>
                                    <p class="mt20">审核结论：</p>
                                    <el-form
                                        label-width="50px"
                                        size="mini"
                                        class="audit-result-form"
                                    >
                                        <el-form-item label="">
                                            <el-radio
                                                v-model="auditTypeResult.specAttr.audit_status"
                                                :label="1"
                                            >通过</el-radio>
                                            <el-radio
                                                v-model="auditTypeResult.specAttr.audit_status"
                                                :label="0"
                                            >不通过</el-radio>
                                        </el-form-item>
                                        <el-form-item
                                            v-if="auditTypeResult.specAttr.audit_status === 0"
                                            class="audit-result"
                                        >
                                            <el-col
                                                :span="12"
                                                class="print-result"
                                            >
                                                <vue-scroll>
                                                    <el-input
                                                        type="textarea"
                                                        :autosize="true"
                                                        placeholder="请输入不通过理由"
                                                        v-model="auditTypeResult.specAttr.audit_remark"
                                                    ></el-input>
                                                </vue-scroll>
                                            </el-col>
                                            <el-col :span="12">
                                                <ul>
                                                    <vue-scroll>
                                                        <li
                                                            v-for="(result, idx) in resultSelect.specAttr"
                                                            :key="idx"
                                                            @click="auditTypeResult.specAttr.audit_remark += result"
                                                        >
                                                            {{ result }}
                                                        </li>
                                                    </vue-scroll>
                                                </ul>
                                            </el-col>
                                        </el-form-item>
                                    </el-form>
                                </el-row>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane
                            label="商品相册"
                            name="images"
                        >
                            <el-form
                                label-width="150px"
                                size="mini"
                            >
                                <el-form-item>
                                    <div class="audit-rule">
                                        * 至少3张 最多5张主图
                                    </div>
                                </el-form-item>
                                <el-form-item label="商品主图：">
                                    <div
                                        class="xiangce"
                                        v-if="detailEntity.PhotoAlbumBrief"
                                    >
                                        <viewer :images="detailEntity.PhotoAlbumBrief">
                                            <img
                                                v-for="(n, idx) in detailEntity.PhotoAlbumBrief"
                                                :key="n.ImgSrc"
                                                :src="n.ImgSrc"
                                                :title="idx + 1"
                                            />
                                        </viewer>
                                    </div>
                                </el-form-item>
                            </el-form>

                            <el-form
                                label-width=""
                                size="mini"
                                class="mt20"
                            >
                                <el-form-item label="">
                                    审核操作记录
                                    <el-tooltip placement="right">
                                        <div slot="content">
                                            <p>1.对应操作后需要勾选对应的选项</p>
                                            <p>注意：需要点击暂存才会保存进度</p>
                                        </div>
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                </el-form-item>
                                <el-form-item label-width="50px">
                                    <el-form-item>
                                        <ul>
                                            <li>
                                                <el-checkbox
                                                    v-model="verify.images.verifyList"
                                                    label="Verify_301"
                                                >主图数量核查</el-checkbox>
                                            </li>
                                            <li>
                                                <el-checkbox
                                                    v-model="verify.images.verifyList"
                                                    label="Verify_302"
                                                >图像清晰度核查</el-checkbox>
                                            </li>
                                            <li>
                                                <el-checkbox
                                                    v-model="verify.images.verifyList"
                                                    label="Verify_303"
                                                >图像违禁核查</el-checkbox>
                                            </li>
                                        </ul>
                                    </el-form-item>
                                </el-form-item>
                            </el-form>
                            <el-row v-if="isAudit">
                                <el-divider></el-divider>
                                <p class="mt20">审核结论：</p>
                                <el-form
                                    label-width="50px"
                                    size="mini"
                                    class="audit-result-form"
                                >
                                    <el-form-item label="">
                                        <el-radio
                                            v-model="auditTypeResult.images.audit_status"
                                            :label="1"
                                        >通过</el-radio>
                                        <el-radio
                                            v-model="auditTypeResult.images.audit_status"
                                            :label="0"
                                        >不通过</el-radio>
                                    </el-form-item>
                                    <el-form-item
                                        v-if="auditTypeResult.images.audit_status === 0"
                                        class="audit-result"
                                    >
                                        <el-col
                                            :span="12"
                                            class="print-result"
                                        >
                                            <vue-scroll>
                                                <el-input
                                                    type="textarea"
                                                    :autosize="true"
                                                    placeholder="请输入不通过理由"
                                                    v-model="auditTypeResult.images.audit_remark"
                                                ></el-input>
                                            </vue-scroll>
                                        </el-col>
                                        <el-col :span="12">
                                            <ul>
                                                <vue-scroll>
                                                    <li
                                                        v-for="(result, idx) in resultSelect.images"
                                                        :key="idx"
                                                        @click="auditTypeResult.images.audit_remark += result"
                                                    >
                                                        {{ result }}
                                                    </li>
                                                </vue-scroll>
                                            </ul>
                                        </el-col>
                                    </el-form-item>
                                </el-form>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane
                            label="商品详情"
                            name="detail"
                        >
                            <el-row>
                                <el-col :span="14">
                                    <el-form
                                        label-width="150px"
                                        size="mini"
                                    >
                                        <el-form-item>
                                            <div class="audit-rule">
                                                <p>* 最多10张详情图</p>
                                                <p>* 确保所有图片宽度需一致</p>
                                                <p>* 确保图片美观度高，品质感强，构图明快简洁，商品主体突出</p>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label="商品详情：">
                                            <div class="commodityimg">
                                                <vue-scroll>
                                                    <div
                                                        v-html="detailEntity.Content"
                                                        class="detail-content"
                                                    ></div>
                                                </vue-scroll>
                                            </div>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                            <el-form
                                label-width=""
                                size="mini"
                                class="mt20"
                            >
                                <el-form-item label="">
                                    审核操作记录
                                    <el-tooltip placement="right">
                                        <div slot="content">
                                            <p>1.对应操作后需要勾选对应的选项</p>
                                            <p>注意：需要点击暂存才会保存进度</p>
                                        </div>
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                </el-form-item>
                                <el-form-item
                                    label=""
                                    label-width="50px"
                                >
                                    <ul>
                                        <li>
                                            <el-checkbox
                                                v-model="verify.detail.verifyList"
                                                label="Verify_401"
                                            >详情图片质量核查</el-checkbox>
                                        </li>
                                        <li>
                                            <el-checkbox
                                                v-model="verify.detail.verifyList"
                                                label="Verify_402"
                                            >详情图片宽度一致性核查</el-checkbox>
                                        </li>
                                        <li>
                                            <el-checkbox
                                                v-model="verify.detail.verifyList"
                                                label="Verify_403"
                                            >详情内容违禁内容核查</el-checkbox>
                                        </li>
                                    </ul>
                                </el-form-item>
                            </el-form>
                            <el-row v-if="isAudit">
                                <el-divider></el-divider>
                                <p class="mt20">审核结论：</p>
                                <el-form
                                    label-width="50px"
                                    size="mini"
                                    class="audit-result-form"
                                >
                                    <el-form-item label="">
                                        <el-radio
                                            v-model="auditTypeResult.detail.audit_status"
                                            :label="1"
                                        >通过</el-radio>
                                        <el-radio
                                            v-model="auditTypeResult.detail.audit_status"
                                            :label="0"
                                        >不通过</el-radio>
                                    </el-form-item>
                                    <el-form-item
                                        v-if="auditTypeResult.detail.audit_status === 0"
                                        class="audit-result"
                                    >
                                        <el-col
                                            :span="12"
                                            class="print-result"
                                        >
                                            <vue-scroll>
                                                <el-input
                                                    type="textarea"
                                                    :autosize="true"
                                                    placeholder="请输入不通过理由"
                                                    v-model="auditTypeResult.detail.audit_remark"
                                                ></el-input>
                                            </vue-scroll>
                                        </el-col>
                                        <el-col :span="12">
                                            <ul>
                                                <vue-scroll>
                                                    <li
                                                        v-for="(result, idx) in resultSelect.detail"
                                                        :key="idx"
                                                        @click="auditTypeResult.detail.audit_remark += result"
                                                    >
                                                        {{ result }}
                                                    </li>
                                                </vue-scroll>
                                            </ul>
                                        </el-col>
                                    </el-form-item>
                                </el-form>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-card>
        <div class="audit-footer">
            <el-button @click="back">返回列表</el-button>
            <el-button
                type="info"
                @click="saveOptional"
                v-if="isAudit"
            >暂存</el-button>
            <el-button
                type="primary"
                @click="submitAudit"
                v-if="isAudit"
            >提交</el-button>
        </div>
    </div>
</template>

<script>

import AuditDetail from '../../../api/audit/queryTaskDetail'
import AuditHistory from '../../../api/audit/queryTaskHistory'
import InsertOptional from '../../../api/audit/insertOptional'
import SubmitAudit from '../../../api/audit/submitAudit'

import AuditHistoryDrawer from '../auditHistory'

export default {
    components: {
        AuditHistoryDrawer
    },
    data() {
        return {
            isAudit: false,
            userInfo: JSON.parse(window.sessionStorage.getItem('USER_INFO')),
            activeName: 'base',
            id: this.$route.params.id,
            detailEntity: {},
            historyQueryCondition: { // 审核历史查询条件
                entity_id: '',
                taskTypeName: '',
                Auditor: '',
                AuditUserName: ''
            },
            auditHistoryList: [], // 审核历史记录列表
            verify: {
                base: {
                    verifyList: [],
                    remark: ''
                },
                specAttr: {
                    verifyList: [],
                    remark: ''
                },
                images: {
                    verifyList: [],
                    remark: ''
                },
                detail: {
                    verifyList: [],
                    remark: ''
                }
            },
            auditTypeResult: {
                base: {
                    audit_type: 'basicInfo',
                    audit_status: '',
                    audit_remark: '',
                    audit_type_str: '基本资料'
                },
                specAttr: {
                    audit_type: 'specification',
                    audit_status: '',
                    audit_remark: '',
                    audit_type_str: '规格属性'
                },
                images: {
                    audit_type: 'album',
                    audit_status: '',
                    audit_remark: '',
                    audit_type_str: '商品相册'
                },
                detail: {
                    audit_type: 'details',
                    audit_status: '',
                    audit_remark: '',
                    audit_type_str: '商品详情'
                }
            },
            resultSelect: {
                base: [
                    '商品名称太简单，不够吸引用户，请参照“品牌+（型号或用途等）其他信息+商品名称”进行填写',
                    '商品名称不能含有与商品实体无关的文字或符号，比如【】',
                    '选择的商品分类有误，建议选择【】',
                    '所售商品暂不支持平台销售',
                    '选择的品牌与商品实体不符',
                    '该商品不适合在网上销售',
                    '填写的信息中存在敏感词汇（恶心、辱骂、威胁、暴恐、政治）',
                    '商品名称【】信息与实际商品信息不符',
                    '商品名称有误（错字、漏字、多字）',
                    '商品名称【】信息与实际商品信息不符',
                    '食品类的商品名称中应有净含量或重量显示',
                    '商品名称数量不明确'
                ],
                specAttr: [
                    '规格填写有误',
                    '规格图片尺寸不对，应为 1:1 比例图片',
                    '规格图片被拉伸、压缩导致变形',
                    '价格可能有误，请认真核对',
                    '满包邮价格过高',
                    '商品规格【】，设置的值有误',
                    '商品属性【】，设置的值有误',
                    '商品规格【】，设置的值存在敏感词汇',
                    '商品属性【】，设置的值存在敏感词汇'
                ],
                images: [
                    '第【】张图片比例有问题（应为1:1正方形图片）',
                    '第【】张图片尺寸有问题（建议图片像素为600*600）',
                    '第一张应为实物全景图',
                    '图片展示与实际销售商品量不符',
                    '第【】张图片不清晰',
                    '第【】张图片内容存在敏感信息',
                    '第【】张图片显示不全、图片存在拼接',
                    '发布数量不足，至少3张以上',
                    '第【】张图片与发布的商品无关',
                    '第【】张图片有违反广告法的内容',
                    '第【】张图片被拉伸、压缩导致变形'
                ],
                detail: [
                    '图片尺寸不正确，导致显示有问题（图片宽度应在480~960像素）',
                    '第【】张图片不清晰',
                    '图片展示与实际销售商品量不符',
                    '第【】张图片与发布的商品无关',
                    '第【】张图片有侵权嫌疑',
                    '详情图片信息与实际商品不符',
                    '第【】张图片内容存在敏感信息',
                    '第【】张图片显示不全、图片存在拼接',
                    '图片发布数量不足，至少5张以上',
                    '第【】张图片有违反广告法的内容',
                    '第【】张图片被拉伸、压缩导致变形'
                ]
            },
            goodsSpecifications: [], // 商品规格列表
            dialog: {
                carriage: false,    // 运费
                visitInstall: false,    // 上门安装
                move: false,    // 搬楼
                citySend: false,    // 同城配送
            },
            service: {
                visitInstallList: [],
                moveList: [],
                citySendList: [],
                cutPrice: ''
            }
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            AuditDetail.call(this, { taskId: this.id }).then(res => {
                if (res.Code === 1) {
                    let entityInfo = JSON.parse(res.Data.entityInfo);
                    this.detailEntity = entityInfo;
                    if (res.Data.auditResultDesc) {
                        let ard = JSON.parse(res.Data.auditResultDesc);
                        if (ard.optional) {
                            this.verify = ard.optional;
                        }
                        console.log(this.verify)
                    }
                    // 商品规格
                    if (entityInfo.Specifications) {
                        this.goodsSpecifications = entityInfo.Specifications;
                    }
                    if (entityInfo.SpecialInfo && entityInfo.SpecialInfo.length > 0) {
                        this.service.visitInstallList = this.findSpec(1);
                        this.service.citySendList = this.findSpec(2);
                        this.service.moveList = this.findSpec(3);
                        this.service.cutPrice = this.findServiceOne();
                    }
                    if (res.Data.auditStatus === 0) {
                        this.isAudit = true;
                    }
                    this.initHistory(res.Data);
                }
            });
        },
        initHistory(entity) {
            let _historyQueryCondition = {};
            _historyQueryCondition.entityId = entity.entityId;
            _historyQueryCondition.taskTypeName = entity.taskTypeName;
            this.$store.dispatch('setHistoryQueryCondition', _historyQueryCondition);
        },
        submitAudit() {

            // 构造审核结果数据
            let auditResult = {};
            auditResult.whole = {};
            auditResult.version = '1.0.0';
            auditResult.audit_status = 1; // 0不通过 1通过
            auditResult.fields = [];

            for (let key in this.auditTypeResult) {
                let oneType = this.auditTypeResult[key];
                console.log(oneType, 'oneType');
                if (oneType.audit_status === '') {
                    this.$message.warning(`请先完成${oneType.audit_type_str}审核`);
                    this.activeName = key;
                    return;
                }
                if (oneType.audit_status == 0) {
                    auditResult.audit_status = 0;
                }
                auditResult.fields.push({
                    id: this.detailEntity.Id,
                    type: oneType.audit_type,
                    audit_status: oneType.audit_status,
                    audit_remark: oneType.audit_remark
                })
            }

            console.log(auditResult, 'auditResult');

            SubmitAudit.call(this, {
                auditor: this.userInfo.id,
                auditUserName: this.userInfo.rel_name,
                task_id: this.id,
                status: auditResult.audit_status,
                taskTypeName: this.$store.getters.getHistoryQueryCondition.taskTypeName, //this.historyQueryCondition.taskTypeName,
                result: auditResult
            }).then(res => {
                if (res.Code == 1) {
                    this.$message.success('操作成功');
                    this.back();
                } else {
                    this.$message.error(res.Desc || '提交失败');
                }
            })

        },
        saveOptional() {
            console.log(this.verify, 'this.verify');
            InsertOptional.call(this, {
                taskId: this.id,
                optional: this.verify
            }).then(res => {
                console.log(res);
                if (res.Code == 1) {
                    this.$message.success('操作记录保存成功');
                } else {
                    this.$message.error(res.Desc || '操作失败');
                }
            })
        },
        findSpec(type) {
            if (!this.detailEntity.SpecialInfo) {
                return [];
            }
            let r = this.detailEntity.SpecialInfo.find(n => n.SpecialType === type);
            if (!r) {
                return [];
            }
            let json = JSON.parse(r.SpecialJson);
            if (!json) {
                return [];
            }
            return json.Item;
        },
        findServiceOne() {
            if (!this.detailEntity.SpecialInfo) {
                return '';
            }
            let r = this.detailEntity.SpecialInfo.find(n => n.SpecialType === 4);
            if (!r) {
                return '';
            }
            return JSON.parse(r.SpecialJson).sprice;
        },
        changeTab(nextTabName) {
            this.activeName = nextTabName;
        },
        indexMethod(idx) {
            return idx + 1;
        },
        back() {
            this.$router.go(-1);
        }
    },

    created() {

    }
}
</script>
<style lang="less">
.detail-content {
    width: 100%;
    img {
        width: 100%;
    }
}
</style>
<style lang="less" scoped>
.make-money {
    color: red;
    font-weight: 600;
}
.audit-rule {
    font-size: 11px;
    color: red;
}
.xiangce {
    img {
        width: 150px;
        height: auto;
        margin: 3px;
    }
}
.commodityimg {
    width: 98%;
    height: 600px;
    border: 1px solid #ddd;
    img {
        width: 100%;
        height: auto;
        display: block;
        cursor: pointer;
        &:hover {
            opacity: 0.3;
        }
    }
}
.imgwh {
    width: 150px;
    max-height: 100%;
}
.exp {
    display: inline-block;
    min-width: 150px;
    max-width: 200px;
}

.page {
    text-align: right;
    padding: 20px;
}

.commodityAttributes {
    width: 100%;
    height: auto;
    margin-top: 10px;
    li {
        float: left;
        p {
            width: 165px;
            height: 30px;
            border: 1px #ddd solid;
            display: block;
            float: left;
            text-align: right;
            line-height: 30px;
            background: #eaeaea;
            margin-top: -1px;
        }
        span {
            width: 120px;
            border: 1px #eaeaea solid;
            display: block;
            float: left;
            text-align: center;
            line-height: 30px;
            background: #fff;
            margin-left: -1px;
            margin-top: -1px;
        }
    }
    :after {
        content: "";
        display: block;
        clear: both;
    }
}

.xukez {
    img {
        width: 150px;
        height: 150px;
    }
}
</style>
