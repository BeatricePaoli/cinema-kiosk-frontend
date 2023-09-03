import * as fromDeviceList from '../reducers/device-list.reducer';
import { selectDeviceListState } from './device-list.selectors';

describe('DeviceList Selectors', () => {
  it('should select the feature state', () => {
    const result = selectDeviceListState({
      [fromDeviceList.deviceListFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
