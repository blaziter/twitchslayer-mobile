export const formatNumber = (golds: number) => {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" },
        { value: 1e12, symbol: "Q" },
        { value: 1e15, symbol: "aa" },
        { value: 1e18, symbol: "ab" },
        { value: 1e21, symbol: "ac" },
        { value: 1e24, symbol: "ad" },
        { value: 1e27, symbol: "ae" },
        { value: 1e30, symbol: "af" },
        { value: 1e33, symbol: "ag" },
        { value: 1e36, symbol: "ah" },
        { value: 1e39, symbol: "ai" },
        { value: 1e42, symbol: "aj" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return golds >= item.value;
    });
    return item ? (golds / item.value).toFixed(2).replace(rx, "$1") + item.symbol : "0";
}