// Sets the height to 100vh (visible content of the iframe)
// Centers content using flexbox
// Also restricts the max width of the inner container
export default () => {
  return {
    template: `
      <div class="flex-grow flex flex-col text-black gx-body gx-body-sm bg-white">
        <div class="flex-grow flex justify-center items-center p-4">
          <story/>
        </div>
        <PortalTarget name="modal" />
      </div>
    `,
  }
}
