// 接口调用抽离管理
// nuxt3下composables目录中导出方法可以被直接调用

export function useIndexDataApi() {
  return useHttpGet('IndexData', '/index', {
    // 懒加载
    lazy: true,
  })
}
