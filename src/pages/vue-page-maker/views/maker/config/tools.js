
// 纯文本
import componentPackText from '../viewComponents/Text';

// 纯图片
import componentPackImage from '../viewComponents/Image';

// 图片墙
import componentPackImageWall from '../viewComponents/ImageWall';

// 图文轮播
import componentPackCarousel from '../viewComponents/Carousel';

// 图文组合
import componentPackCell from '../viewComponents/Cell';

// 图文列表
import componentPackCellList from '../viewComponents/CellList';


// 商品列表
import componentPackGoodsList from '../viewComponents/GoodsList';

// 分类
import componentPackGoodsCategory from '../viewComponents/GoodsCategory';

// 推荐
import componentPackGoodsRecommend from '../viewComponents/GoodsRecommend';

// 独个商品
import componentPackGoodsAlone from '../viewComponents/GoodsAlone';

// 优惠券
import componentPackCoupon from '../viewComponents/Coupon';


// 顶部导航
import componentPackNavTop from '../viewComponents/NavTop';

// 底部导航
import componentPackNavTab from '../viewComponents/NavTab';

// 宫格导航
import componentPackNavGrid from '../viewComponents/NavGrid';


/**
 * hidden 隐藏，不显示在工具栏
 * maxNum Number 最大可配置数
 * topDisplay Bool 最顶部显示
 * bottomDisplay Bool 最底部显示
 * onlyCanConfig Bool 是否只能配置数据，不能删除 copy
 * @type {*[]}
 */
const tools = [
    {
        groupName: '图文类',
        componentList: [{
            title: '纯文本',
            maxNum: 20,
            icon: 'el-icon-notebook-1',
            componentPack: componentPackText
        }, {
            title: '纯图片',
            maxNum: 20,
            icon: 'el-icon-notebook-1',
            componentPack: componentPackImage
        }, {
            title: '图片墙',
            maxNum: 10,
            icon: 'el-icon-picture',
            componentPack: componentPackImageWall
        }, {
            title: '图文轮播',
            maxNum: 2,
            icon: 'el-icon-picture',
            componentPack: componentPackCarousel
        }, {
            title: '图文组合',
            maxNum: 10,
            icon: 'el-icon-notebook-1',
            componentPack: componentPackCell
        }, {
            title: '图文组合列表',
            maxNum: 5,
            icon: 'el-icon-notebook-1',
            componentPack: componentPackCellList
        }, ]
    },
    {
        groupName: '商品类',
        componentList: [{
            title: '商品列表',
            maxNum: 1,
            icon: 'el-icon-s-goods',
            componentPack: componentPackGoodsList,
            additional: {
                bottomDisplay: true,
                unRemove: true
            }
        }, {
            title: '推荐商品',
            maxNum: 5,
            icon: 'el-icon-s-goods',
            componentPack: componentPackGoodsRecommend
        }, {
            title: '单个商品',
            maxNum: 10,
            icon: 'el-icon-picture',
            componentPack: componentPackGoodsAlone
        }, {
            title: '分类推荐',
            maxNum: 5,
            icon: 'el-icon-s-grid',
            componentPack: componentPackGoodsCategory
        }]
    },
    {
        groupName: '营销互动类',
        componentList: [{
            title: '领券',
            maxNum: 1,
            icon: 'el-icon-s-ticket',
            componentPack: componentPackCoupon
        },{
            title: '抽奖',
            maxNum: 1,
            icon: 'el-icon-s-ticket',
            componentPack: componentPackCoupon
        },]
    },
    {
        groupName: '导航类',
        componentList: [{
            title: '顶部导航',
            maxNum: 1,
            icon: 'el-icon-s-goods',
            componentPack: componentPackNavTop,
            additional: {
                topDisplay: true,
            }
        },{
            title: '底部导航',
            maxNum: 1,
            icon: 'el-icon-s-goods',
            componentPack: componentPackNavTab,
            additional: {
                bottomDisplay: true,
            }
        }, {
            title: '宫格导航',
            maxNum: 1,
            icon: 'el-icon-s-goods',
            componentPack: componentPackNavGrid
        }, {
            title: '浮动导航',
            maxNum: 3,
            icon: 'el-icon-s-goods',
            componentPack: componentPackCoupon,
            additional: {
                unRemove: true
            }
        }]
    }
];

export default tools;
