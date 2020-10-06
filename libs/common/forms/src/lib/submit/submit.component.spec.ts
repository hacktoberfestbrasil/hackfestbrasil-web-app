import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { HackfestSubmitComponent } from './submit.component';

const VIEWS = {
  element: `<hackfest-submit></hackfest-submit>`,
  button: `<button hackfest-submit>Submit</button>`,
  buttonDisabled: `<button disabled="true" hackfest-submit>Submit</button>`,

}

describe('HackfestSubmitComponent', () => {
  let spectator: SpectatorHost<HackfestSubmitComponent>;

  const createHost = createHostFactory(HackfestSubmitComponent);


  describe('Views', () => {
    it('should create snapshot', () => {
      spectator = createHost(VIEWS.element);
      expect(spectator.component).toMatchSnapshot();
    });

    it('should create button snapshot', () => {
      spectator = createHost(VIEWS.button);
      expect(spectator.component).toMatchSnapshot();
    });

    it('should create button disabled', () => {
      spectator = createHost(VIEWS.buttonDisabled);
      expect(spectator.component).toMatchSnapshot();
    });
  })

  it('should create', () => {
    spectator = createHost(`<hackfest-submit></hackfest-submit>`);
    expect(spectator.component).toBeTruthy();
  });

  it('should have submit text', () => {
    spectator = createHost(`<hackfest-submit>Submit</hackfest-submit>`);
    expect(spectator.query('button')).toHaveText('Submit');
  });

  it('should have text with button as host', () => {
    spectator = createHost(`<button hackfest-submit>Submit</button>`);
    expect(spectator.element).toHaveText('Submit');
  });

  it('should be disabled', () => {
    spectator = createHost(`<button disabled="true" hackfest-submit>Submit</button>`);
    expect(spectator.element.hasAttribute('disabled')).toBeTruthy();
  });

  it('should have svg and button elements', () => {
    spectator = createHost(`<hackfest-submit>Botão</hackfest-submit>`);
    expect(spectator.query('svg')).toExist();
    expect(spectator.query('button')).toExist();
  });

});
