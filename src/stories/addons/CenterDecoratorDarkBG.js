// Sets the height to 100vh (visible content of the iframe)
// Centers content using flexbox
// Also restricts the max width of the inner container
export default () => {
  return {
    template: `
      <div class="min-h-screen flex justify-center items-center">
        <div class="max-w-3xl flex-grow flex justify-center items-center bg-primary-500 min-h-screen">
          <story/>
        </div>
      </div>
    `,
  }
}
