
export default [{
        name: 'Carousel',
        value: {
            height: 120,
            list: [{
                image: {image:"https://img.alicdn.com/tps/i4/TB1ecCsOCzqK1RjSZPxSuw4tVXa.jpg"}
            },{
                image: {image:"https://img.alicdn.com/tps/i4/TB1tVhuNhnaK1RjSZFBSuwW7VXa.jpg"}
            },{
                image: {image:"https://img.alicdn.com/tfs/TB1n5sCMYvpK1RjSZPiXXbmwXXa-900-320.jpg"}
            }],
        }
    },{
        name: 'Text',
        value: {
            title: {
                text: "超值进口新发现",
                color: "#A01B1B",
                fontSize: "24px"
            },
            animate: {
                animateName: "animate__flip"
            },
            style: {
                padding: '10px',
                textAlign: 'center',
            },
        }
    },{
        name: 'ImageWall',
        value: {
            layout: "6,6,6,6",
            gutter: 2,
            list: [{
                image:"https://img.alicdn.com/tps/i4/TB1t2dzOvb2gK0jSZK9wu1EgFXa.png_500x1000q75.jpg_.webp"
            }, {
                image:"https://img.alicdn.com/tps/i4/TB1ZJtFOAL0gK0jSZFAwu3A9pXa.png_500x1000q75.jpg_.webp"
            }, {
                image:"https://img.alicdn.com/tps/i4/TB1Q2Mnd2zO3e4jSZFxwu1P_FXa.png_500x1000q75.jpg_.webp"
            }, {
                image:"https://img.alicdn.com/tps/i4/TB1y4tuOxz1gK0jSZSgSuuvwpXa.jpg_500x1000q75s0.jpg_.webp"
            }],
        }
    },
    {
        name: 'Cell',
        value: {
            cell: {
                image: {
                    image: "https://s4.ax1x.com/2021/12/16/T9fouV.png"
                },
                text1: {
                    text: "超值推荐",
                    fontSize: "16px",
                },
                direction: "row",
                size: 32,
                style: {
                    padding: "0 0 0 5px",
                    textAlign: "left",
                },
                animate: {
                    animateName: "animate__bounce",
                    animateRepeat: "animate__repeat-3",
                },
            }
        }
    },
    {
        name: 'Image',
        value: {
            image: {
                image: "https://s4.ax1x.com/2021/12/16/T9fouV.png"
            },
            animate: {
                animateName: "animate__tada",
                animateRepeat: "animate__repeat-3",
            },
            style: {}
        }
    },
    {
        name: 'Text',
        value: {
            title: {
                text: "-- The End --",
                fontSize: "16px",
            },
            animate: {},
            style: {
                margin: "5px 0",
            }
        }
    },
];
