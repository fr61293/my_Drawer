import { Component,EventEmitter,Output, OnInit,Input} from '@angular/core';

@Component({
  selector: 'SearchForm',
    template: `
    <FlexboxLayout flexDirection="row">
        <TextField #texto="ngModel" [(ngModel)]="textFieldValue"
                hint="Ingresar texto..." required minlen="4">
        </TextField>
        <Label *ngIf="texto.hasError('required')" text="Debe ingresar texto"></Label>
        <Label *ngIf="!texto.hasError('required')
                            && texto.hasError('minlen')" text="4 letras o mas">
        </Label>
    </FlexboxLayout>
    <Button text="Buscar!" (tap)="onButtonTap()" *ngIf="texto.valid"></Button>
    `
    
})
export class SearchFormComponent implements OnInit{

    textFieldValue: string = "";
    @Output() search: EventEmitter<string> = new EventEmitter();
    @Input() inicial: string;
     ngOnInit(): void{
        this.textFieldValue=this.inicial;
    }
	
    onButtonTap(): void {
        console.log(this.textFieldValue);
        if (this.textFieldValue.length > 2) {
            this.search.emit(this.textFieldValue);
        }
    }

}
