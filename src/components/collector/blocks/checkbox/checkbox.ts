import * as Tripetto from 'tripetto-collector';
import { Component, Input } from '@angular/core';
import { ICheckbox } from 'tripetto-block-checkbox';

const SELECTOR = 'tripetto-block-checkbox';

interface IProps {
  name: string;
  explanation: string;
  slot: Tripetto.Slot;
  checked: Tripetto.Data<boolean>;
}

@Component({
  selector: SELECTOR,
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.css']
})
class CheckboxComponent {
  @Input() props: IProps;
}

@Tripetto.node(SELECTOR)
export class CheckboxBlock extends Tripetto.NodeBlock<IProps, ICheckbox> {
  static Component = CheckboxComponent;

  public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): IProps {
    return {
      name: this.Node.Props.Name,
      explanation: this.Node.Props.Explanation,
      slot: this.SlotAssert('checked'),
      checked: this.DataAssert<boolean>(instance, 'checked')
    };
  }

  public OnValidate(instance: Tripetto.Instance): boolean {
    const slot = this.SlotAssert('checked');
    const checkbox = this.DataAssert<boolean>(instance, slot);

    return !slot.Required || checkbox.Value;
  }
}